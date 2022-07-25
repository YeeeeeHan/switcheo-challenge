import * as $ from "jquery";

var Web3 = require('web3');
var web3 = new Web3('https://bsc-dataseed1.binance.org:443');
var version = web3.version.api;


// $.getJSON('https://api.bscscan.com/api?module=contract&action=getabi&address=0x250b211ee44459dad5cd3bca803dd6a7ecb5d46c&apikey=CPJMB4QIMRY3AXIMQ8MNJQ7FS3CWZAPHAC', function (data) {
//     var contractABI = "";
//     contractABI = JSON.parse(data.result);
//     if (contractABI != '') {
//         var MyContract = web3.eth.contract(contractABI);
//         var myContractInstance = MyContract.at("0x250b211ee44459dad5cd3bca803dd6a7ecb5d46c");
//         var result = myContractInstance.balanceOf("0x123d475e13aa54a43a7421d94caa4459da021c77");
//         console.log("result1 : " + result);
//     } else {
//         console.log("Error");
//     }
// });

import fetch from 'node-fetch';

const test = async () => {
    const response = await fetch('https://api.bscscan.com/api?module=contract&action=getabi&address=0x250b211ee44459dad5cd3bca803dd6a7ecb5d46c&apikey=CPJMB4QIMRY3AXIMQ8MNJQ7FS3CWZAPHAC');
    let data = await response.json();
    var contractABI = "";
    contractABI = JSON.parse(data.result);
    if (contractABI != '') {
        var MyContract = web3.eth.contract(contractABI);
        var myContractInstance = MyContract.at("0x250b211ee44459dad5cd3bca803dd6a7ecb5d46c");
        var result = myContractInstance.balanceOf("0x123d475e13aa54a43a7421d94caa4459da021c77");
        console.log("result1 : " + result);
    } else {
        console.log("Error");
    }
};

console.log(test);