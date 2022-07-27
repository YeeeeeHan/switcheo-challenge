
## Overview
This image is an overview of the Transaction Broadcaster Service which consists of 3 services ( **Broadcaster**,  **Reconciliation**,  **History**) that work hand-in-hand to broadcast transactions to an EVM-compatible blockchain network in an accurate and fault-tolerant manner. Additionally, a **Kafka message queue** and a persistent **database store** is further used to achieve the aforementioned goals.

![Untitled](https://i.ibb.co/jL2HRhp/overview.png)

In the following sections, we will examine the 3 services in further detail.

## 1. The Broadcaster Service
The **Broadcaster** Service's main concern is broadcasting transaction to the blockchain network. 

![Untitled](https://i.ibb.co/d7zyz3G/TBS-drawio.png)

It has the following responsibilities:
1. Interfacing with the client
    * It exposes HTTP endpoints for clients to make HTTP calls (`POST /broadcast\_transaction`, `POST /retry_transaction`)
    * Returning the appropriate HTTP status codes (shown below) according to the response from the blockchain node
2. Signing of transaction
    * This service contains the main logic to sign the transaction according to an encryption or signing algorithm
3. Interfacing with the blockchain network
    * Upon signing the transaction, it makes RPC requests to blockchain node, in order to broadcast it to the blockchain network
    * The service then awaits the response from the blockchain node
4. Publishing to Kafka
    * This service is also the main publisher of events into the Kafka "history" topic
    * **ALL** Responses from the blockchain node will be published as events in the topic, allowing other subscribing services to consume asynchronously
    * The message queue is chosen because both **Reconciliation** and **History** services require status information of the transactions executed, but do not need to be operating synchronously with each other (further elaborated below)
5. Handling retries
    * Since this service is the first to receive the response from the block chain node, it makes sense for it to be in-charge of error handling
    * If it receives a failure code from the blockchain node, it will retry immediately (after publishing the failure to Kafka topic)
6. Timeout
    * In the 95% of the time that the blockchain node responds timely, the server will return `200 - OK` or `502 - Bad Gateway` status codes to the client in 2 seconds
    * In the 1% of the time that the node responds after 30 seconds, the server will timeout after 10 seconds, return a `504 - Gateway Timeout`, and publish the timeout event on Kafka. This is to ensure the responsiveness of the server and to limit the client's waiting time.
    * However, once a response is received at the end of 30 seconds, it is still published to the kafka topic as per normal (clients can use the **History** service to view result of their timed-out transactions)

   | Scenario: Response from blockchain node  | Response to client| Retry | Publish to Kafka |
   | ------------- | ------------- | ------------- |
   | Success RPC response  | `200 - OK`  | No | Yes - `Success` |
   | Failed RPC response  | `502 - Bad Gateway`  | Yes |Yes - `Failure` |
   | > 10 seconds delay in RPC response (1%) | `504 - Gateway Timeout`  | No |Yes - `Timeout` |
   | RPC responds 30 seconds later | NIL | Depends | Yes - `Success/Failure` |


## 2. The Reconciliation Service
The **Reconciliation** Service's main concern is to ensure that transactions with successful status codes are actually broadcasted and living in the blockchain network. It does so by subscribing to the Kafka topic, consuming only the events that has been marked as a "successful" transaction. Next, it will query the blockchain node via RPC requests to determine if the transaction is found in the network.

![Untitled](https://i.ibb.co/HnJh0X0/recon-drawio.png)

There are 2 scenarios that would arise:
1. Tranasctions from the kafka topic marked as successful, is found in the network - This is a desired behaviour, no action required.
2. Tranasctions from the kafka topic marked as successful, are *NOT* found in the network -In this case, the **Reconciliation** Service will invoke the **Broadcaster** Service to retry the transaction broadcast.

This ensures that any transaction broacast request where `200 - OK` is returned to the client is actually found in the blockchain network.



## 3. The History Service
The **History** Service's main concern is to log down all attempts at transaction broadcasting, so that clients can view the list of transactions that passed or failed.

![Untitled](https://i.ibb.co/zN691Wc/history-drawio.png)

It has the following responsibilities:

1. Subscribe to Kafka topic and write to database
    * This service consumes ALL events in this topic and writes it to the database for persistent storage
    * The events are split into 3 main categories (`Success`, `Failure`, `Timeout`, `Reconciled`)
    * `Success` and `Failure` events refer to the response from the blockchain network
    * `Timeout` is a temporary status that lasts as long as the RPC response is not received. Upon receiving a `Success/Failure` after the 30 seconds, the service will update the DB to reflect the correct eventual status
    * `Reconciled` is a status that happens when this service encounters a *duplicate* `Success` response for the same transaction ID. This means that the previous `Success` status was inaccurate, as the **Reconciliation** service detected a mismatch on the network. The previous `Success` status would be updated to `Reconciled`, with the latest `Success` entry being the correct version.
2. Providing an interface to the DB - to display page that shows the list of transactions that passed or failed
    * This service will also expose an endpoint to allow clients to query transation history information, possibly to render the page of historical transactions.
