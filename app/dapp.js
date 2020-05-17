//github.com/IBM/hyperledger-fabric-evm-demo/blob/master/src/dapp.js
const Web3 = require('web3');
var contractAddress = '0x30E605d1344D9235d402fF8E1d635fce8a88D862';
var pcontractAddress = '0xC11C331f76b2d3d14b1a15B76b846A797bF61F29';
var provider = "http://localhost:5002";

var myContract;
var producerContract;

/**************************************************************/
/********************* Get PRODUCER CONTRACT **********************/
/**************************************************************/
function getProducerContract() {
    console.log("Getting the Producer Contract");

    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider(provider));
    web3.eth.defaultAccount = web3.eth.accounts[0];

    var address = pcontractAddress;

    console.log("Got producer address: " + address)

    var producerContractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "registerAdmin",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTotPointsProvided",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "producers",
		"outputs": [
			{
				"name": "adminAddress",
				"type": "address"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "isRegistered",
				"type": "bool"
			},
			{
				"name": "numBox",
				"type": "uint256"
			},
			{
				"name": "pointsProvided",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTotBoxNew",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "admins",
		"outputs": [
			{
				"name": "adminAddress",
				"type": "address"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "upCycledIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUpCycledIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_upCycledIndex",
				"type": "uint256"
			}
		],
		"name": "getUpCycledRequest",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getPendingIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "registerProducer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_producerAddress",
				"type": "address"
			}
		],
		"name": "getProducerData",
		"outputs": [
			{
				"name": "producerAddress",
				"type": "address"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "numBox",
				"type": "uint256"
			},
			{
				"name": "points",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tshirt",
				"type": "uint256"
			},
			{
				"name": "_pants",
				"type": "uint256"
			},
			{
				"name": "_jackets",
				"type": "uint256"
			},
			{
				"name": "_other",
				"type": "uint256"
			},
			{
				"name": "_points",
				"type": "uint256"
			}
		],
		"name": "sendBoxNew",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getEvaluatedIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "pendingIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_points",
				"type": "uint256"
			}
		],
		"name": "evaluateBox",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tshirt",
				"type": "uint256"
			},
			{
				"name": "_pants",
				"type": "uint256"
			},
			{
				"name": "_jackets",
				"type": "uint256"
			},
			{
				"name": "_other",
				"type": "uint256"
			}
		],
		"name": "sendBoxOld",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNextPendingRequest",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "evaluatedIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_evaluatedIndex",
				"type": "uint256"
			}
		],
		"name": "getEvaluatedRequest",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_pendingIndex",
				"type": "uint256"
			}
		],
		"name": "getPendingRequest",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTotBoxOld",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

    var ProducerContract = web3.eth.contract(producerContractABI);
    producerContract = ProducerContract.at(address);
    return producerContract;
}

/**************************************************************/
/********************* Get USER CONTRACT **********************/
/**************************************************************/
function getContract() {
    console.log("Getting the Contract");

    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider(provider));
    web3.eth.defaultAccount = web3.eth.accounts[0];

    var address = contractAddress;

    console.log("Got address: " + address)

    var userContractABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "getUserBoxNum",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "transactionsInfoLength",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUserTransactionNum",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getUserRequest",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "registerAdmin",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_transactionIndex",
				"type": "uint256"
			}
		],
		"name": "getAdminTransactionInfo",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tshirt",
				"type": "uint256"
			},
			{
				"name": "_pants",
				"type": "uint256"
			},
			{
				"name": "_jackets",
				"type": "uint256"
			},
			{
				"name": "_other",
				"type": "uint256"
			}
		],
		"name": "sendBox",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTotTransactionNum",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "admins",
		"outputs": [
			{
				"name": "adminAddress",
				"type": "address"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_points",
				"type": "uint256"
			}
		],
		"name": "usePoints",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "transactionsInfo",
		"outputs": [
			{
				"name": "points",
				"type": "uint256"
			},
			{
				"name": "transactionType",
				"type": "uint8"
			},
			{
				"name": "userAddress",
				"type": "address"
			},
			{
				"name": "adminAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getPendingIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "adminsInfo",
		"outputs": [
			{
				"name": "adminAddress",
				"type": "address"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"name": "userAddress",
				"type": "address"
			},
			{
				"name": "firstName",
				"type": "string"
			},
			{
				"name": "lastName",
				"type": "string"
			},
			{
				"name": "email",
				"type": "string"
			},
			{
				"name": "points",
				"type": "uint256"
			},
			{
				"name": "isRegistered",
				"type": "bool"
			},
			{
				"name": "numTransaction",
				"type": "uint256"
			},
			{
				"name": "numBox",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getEvaluatedIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "pendingIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_points",
				"type": "uint256"
			}
		],
		"name": "evaluateBox",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNextPendingRequest",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "evaluatedIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "adminsInfoLength",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_firstName",
				"type": "string"
			},
			{
				"name": "_lastName",
				"type": "string"
			},
			{
				"name": "_email",
				"type": "string"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_transactionIndex",
				"type": "uint256"
			}
		],
		"name": "getTransactionInfo",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_evaluatedIndex",
				"type": "uint256"
			}
		],
		"name": "getEvaluatedRequest",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_pendingIndex",
				"type": "uint256"
			}
		],
		"name": "getPendingRequest",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getUserData",
		"outputs": [
			{
				"name": "userAddress",
				"type": "address"
			},
			{
				"name": "firstName",
				"type": "string"
			},
			{
				"name": "lastName",
				"type": "string"
			},
			{
				"name": "email",
				"type": "string"
			},
			{
				"name": "points",
				"type": "uint256"
			},
			{
				"name": "isRegistered",
				"type": "bool"
			},
			{
				"name": "numTransaction",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
    var LoyaltyContract = web3.eth.contract(userContractABI);
    myContract = LoyaltyContract.at(address);
    return myContract;
}

function getAccountAddress() {
    console.log("Getting the Contract");

    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider(provider));

    //web3.eth.defaultAccount = '0x' + account;
    web3.eth.defaultAccount = web3.eth.accounts[0];

    //console.log("Account " + account)
    return web3.eth.defaultAccount;
}

/*********************************************************/
/*********************** MODULES *************************/
/*********************************************************/
//export module
module.exports = {

  registerUser: function (firstName, lastName, email) {
    try {
      var myContract = getContract();
      var response = myContract.registerUser(firstName, lastName, email);
      return response;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  registerAdmin: function (name) {
    try {
      var uContract = getContract();
      var pContract = getProducerContract();
      var response1 = uContract.registerAdmin(name);
      var response2 = pContract.registerAdmin(name);
      return response1 + " " + response2;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  userData: function () {
    try {
      var myContract = getContract();
      var accountAddress = getAccountAddress();
      var userData = myContract.users(accountAddress); //getUserData(accountAddress);

      if(userData[5]) {
        return userData;
      } else {
        throw new Error("User not found");
      }

    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  adminData: function (proxy) {
    try {
      var myContract = getContract();
      var accountAddress = getAccountAddress();
      var adminData = myContract.admins(accountAddress);

      if(adminData[2]) {
        return adminData;
      } else {
        throw new Error("Admin not found");
      }
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  userTransactionsData: function (proxy) {
    try {
      var myContract = getContract();

      var transactionsLength = myContract.getUserTransactionNum();
      var transactionsData = [];

      for (var i = 0; i < transactionsLength; i++) {
      	var tmp = myContract.getTransactionInfo(i);
      	var array = tmp.toString().split(",");
        transactionsData.push(array);
      }

      return transactionsData;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  userBoxRequest: function (proxy) {
    try {
      var myContract = getContract();

      var evaluatedLength = myContract.getUserBoxNum();
      var evaluatedRequests = [];

      for (var i = 0; i < evaluatedLength; i++) {
        var tmp = myContract.getUserRequest(i);
        var array = tmp.toString().split(",");
        evaluatedRequests.push(array);
      }

      return evaluatedRequests;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  adminTransactionsData: function (proxy) {
    try {
      var myContract = getContract();

      var transactionsLength = myContract.getTotTransactionNum();
      var transactionsData = [];

      for (var i = 0; i < transactionsLength; i++) {
	var tmp = myContract.getAdminTransactionInfo(i);
	var array = tmp.toString().split(",");
        transactionsData.push(array);
      }

      return transactionsData;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  pendingRequests: function (proxy) {
    try {
      var myContract = getContract();

      var pendingLength = myContract.getPendingIndex();
      var evaluatedLength = myContract.getEvaluatedIndex();
      var pendingRequests = [];

      for (var i = evaluatedLength; i < pendingLength; i++) {
        var tmp = myContract.getPendingRequest(i);
        var array = tmp.toString().split(",");
        pendingRequests.push(array);
      }

      return pendingRequests;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  evaluatedRequests: function (proxy) {
    try {
      var myContract = getContract();

      var evaluatedLength = myContract.getEvaluatedIndex();
      var evaluatedRequests = [];

      for (var i = 0; i < evaluatedLength; i++) {
        var tmp = myContract.getEvaluatedRequest(i);
        var array = tmp.toString().split(",");
        evaluatedRequests.push(array);
      }

      return evaluatedRequests;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  nextPendingRequest: function (proxy) {
    try {
      var myContract = getContract();

      var pendingIndex = myContract.getPendingIndex();
      var evaluatedIndex = myContract.getEvaluatedIndex();

      if(pendingIndex==0){
        return null;
      }
      else{
      var tmp = myContract.getNextPendingRequest();
      var nextPendingRequest = tmp.toString().split(",");

      return nextPendingRequest;
      }
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  sendBox: function (tshirt, pants, jackets, other, proxy) {
    try {
      var myContract = getContract();

      var response = myContract.sendBox(tshirt, pants, jackets, other);

      return response;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  usePoints: function (points, proxy) {
    try {
      var myContract = getContract();
      var response = myContract.usePoints(points);
      return response;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  evaluateBox: function (points, proxy) {
    try {
      var myContract = getContract();
      var response = myContract.evaluateBox(points);
      return response;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  /*****************************/
  /***** Producer Contract *****/
  /*****************************/

  registerProducer: function (name) {
    try {
      var myContract = getProducerContract();
      var response = myContract.registerProducer(name);
      return response;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  producerData: function (proxy) {
    try {
      var myContract = getProducerContract();
      var accountAddress = getAccountAddress();
      var partnerData = myContract.getProducerData(accountAddress);

      if(partnerData[2]) {
        return partnerData;
      } else {
        throw new Error("Partner not found");
      }
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  producerPendingRequests: function (proxy) {
    try {
      var myContract = getProducerContract();

      var pendingLength = myContract.getPendingIndex();
      var evaluatedLength = myContract.getEvaluatedIndex();
      var pendingRequests = [];

      for (var i = evaluatedLength; i < pendingLength; i++) {
        var tmp = myContract.getPendingRequest(i);
        var array = tmp.toString().split(",");
        pendingRequests.push(array);
      }

      return pendingRequests;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  producerEvaluatedRequests: function (proxy) {
    try {
      var myContract = getProducerContract();

      var evaluatedLength = myContract.getEvaluatedIndex();
      var evaluatedRequests = [];

      for (var i = 0; i < evaluatedLength; i++) {
        var tmp = myContract.getEvaluatedRequest(i);
        var array = tmp.toString().split(",");
        evaluatedRequests.push(array);
      }

      return evaluatedRequests;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  producerUpCycledRequests: function (proxy) {
    try {
      var myContract = getProducerContract();

      var upCycledLength = myContract.getUpCycledIndex();
      var upCycledRequests = [];

      for (var i = 0; i < upCycledLength; i++) {
        var tmp = myContract.getUpCycledRequest(i);
        var array = tmp.toString().split(",");
        upCycledRequests.push(array);
      }

      return upCycledRequests;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  producerNextPendingRequest: function (proxy) {
    try {
      var myContract = getProducerContract();

      var pendingIndex = myContract.getPendingIndex();
      var evaluatedIndex = myContract.getEvaluatedIndex();

      if(pendingIndex==0){
        return null;
      }
      else{
      var tmp = myContract.getNextPendingRequest();
      var nextPendingRequest = tmp.toString().split(",");

      return nextPendingRequest;
      }
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  sendOldBox: function (tshirt, pants, jackets, other, proxy) {
    try {
      var myContract = getProducerDataContract();

      var response = myContract.sendBoxOld(tshirt, pants, jackets, other);

      return response;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  sendNewBox: function (tshirt, pants, jackets, other, points, proxy) {
    try {
      var myContract = getProducerDataContract();

      var response = myContract.sendBoxNew(tshirt, pants, jackets, other, points);

      return response;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  producerEvaluateBox: function (points, proxy) {
    try {
      var myContract = getProducerContract();
      var response = myContract.evaluateBox(points);
      return response;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  getTotPointsProvided: function (proxy) {
    try {
      var myContract = getProducerContract();
      var points = myContract.getTotPointsProvided();

      return points;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  getTotBoxOld: function (proxy) {
    try {
      var myContract = getProducerContract();
      var boxNum = myContract.getTotBoxOld();

      return boxNum;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  },

  getTotBoxNew: function (proxy) {
    try {
      var myContract = getProducerContract();
      var boxNum = myContract.getTotBoxNew();

      return boxNum;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }
  }

}
