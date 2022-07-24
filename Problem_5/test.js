const { ethers } = require("ethers");

const ADDR = "0xbCa7b63604bB0d8209189501ae4f6Bc48c72c856";   // your contract address
const ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "address[]",
                "name": "tokens",
                "type": "address[]"
            }
        ],
        "name": "getBalances",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Balance.BalStruct[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];    // your contract ABI

const ADDRESS = "0xf89804FB5037d25B0dB38A99a78C487755Af1FE9"; // some wallet address with token balance
const TOKENS = [    // token contract addresses
    "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
];

// you can use your own RPC provider url (no need to deploy to mainnet)
const provider = new ethers.providers.JsonRpcProvider(require("./secrets.json").infuralink)

const test = async () => {
    const contract = new ethers.Contract(ADDR, ABI, provider);

    const balances = await contract.getBalances(ADDRESS, TOKENS);

    return balances;
};

test().then(console.log);