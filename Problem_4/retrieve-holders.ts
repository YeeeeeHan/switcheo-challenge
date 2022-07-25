import fetch from "node-fetch";
var Web3 = require('web3');
var web3 = new Web3('https://bsc-dataseed1.binance.org:443');
var version = web3.version.api;

const SWTH_CONT_ADD = "0x250b211ee44459dad5cd3bca803dd6a7ecb5d46c"

let addresses = [
    "0x123d475e13aa54a43a7421d94caa4459da021c77",
    "0x0020c5222a24e4a96b720c06b803fb8d34adc0af",
    "0xfe808b079187cc460f47374580f5fb47c82b87a5"
]

const test = async () => {
    const response = await fetch('https://api.bscscan.com/api?module=contract&action=getabi&address=0x250b211ee44459dad5cd3bca803dd6a7ecb5d46c&apikey=CPJMB4QIMRY3AXIMQ8MNJQ7FS3CWZAPHAC');
    let data = await response.json();
    var contractABI = "";
    contractABI = JSON.parse(data.result);
    if (contractABI != '') {
        for (let i = 0; i < addresses.length; i++) {
            var myContractInstance = new web3.eth.Contract(contractABI, SWTH_CONT_ADD);
            var result = await myContractInstance.methods.balanceOf(addresses[i]).call();
            console.log(addresses[i] + " : " + result);
        }
    } else {
        console.log("Error");
    }
};

test()
