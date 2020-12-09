//////////////////////
typeof web3 !== 'undefined'
 ? (web3 = new Web3(web3.currentProvider))
 : web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
//////////////////////

var account;
web3.eth.getAccounts().then((f) => {
     account = f[6];
})

//////////////////////
contract = new web3.eth.Contract([{
          "constant": true,
          "inputs": [{
               "name": "candidate",
               "type": "bytes32"
          }],
          "name": "totalVotesFor",
          "outputs": [{
               "name": "",
               "type": "uint256"
          }],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
     },
     {
          "constant": true,
          "inputs": [{
               "name": "candidate",
               "type": "bytes32"
          }],
          "name": "validCandidate",
          "outputs": [{
               "name": "",
               "type": "bool"
          }],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
     },
     {
          "constant": true,
          "inputs": [{
               "name": "",
               "type": "bytes32"
          }],
          "name": "votesReceived",
          "outputs": [{
               "name": "",
               "type": "uint256"
          }],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
     },
     {
          "constant": true,
          "inputs": [{
               "name": "",
               "type": "uint256"
          }],
          "name": "candidateList",
          "outputs": [{
               "name": "",
               "type": "bytes32"
          }],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
     },
     {
          "constant": false,
          "inputs": [{
               "name": "candidate",
               "type": "bytes32"
          }],
          "name": "voteForCandidate",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
     },
     {
          "inputs": [{
               "name": "candidateNames",
               "type": "bytes32[]"
          }],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "constructor"
     }
]);
contract.options.address = "0xFBa97c6504e7BcA0F287203e43e4982f2434Ae2C";
////////////////////// Contract, contract.options.address 입력해주어야 전역변수 불러올 수 있음.

candidates = {
     "Rama": "candidate-1",
     "Nick": "candidate-2",
     "Jose": "candidate-3"
}

function voteForCandidate(candidate) {
     candidateName = $('#candidate').val();

     contract.methods.voteForCandidate(web3.utils.asciiToHex(candidateName)).send({
          from: account
     }).then((f) => {
          let div_id = candidates[candidateName];
          contract.methods.totalVotesFor(web3.utils.asciiToHex(candidateName)).call().then((f) => {
               $('#' + div_id).html(f);
          })
     })
}

$(document).ready(function () {
     candidateNames = Object.keys(candidates);

     for (var i = 0; i < candidateNames.length; i++) {
          let name = candidateNames[i];
          contract.methods.totalVotesFor(web3.utils.asciiToHex(name)).call().then((f) => {
               $('#' + candidates[name]).html(f);
          })
     }
}); // end of ready