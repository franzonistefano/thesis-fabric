const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;

const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/98fc6ab2e57f4cbfbb2f89d6cde49596");
const web3 = new Web3(provider);

/* Reclothes Account */
const reclothesAdress = '0x1433D083c48609862a536b78D3777adFc20601ad';
const reclothesPrivateKey = Buffer.from('6F5DDEB8190B831E24DB2CD461FCD1003ED30990B38FF145FFA26251C6891438', 'hex');

/* User Account */
const user1Adress = '0xf07e54dBDF0FC9fdB52A8C90cF988c4e7D46830e';
const user1PrivateKey = Buffer.from('F11175BDFF3A38A5A31228512930BC8434EB61CAB7CE5022404B907ADD0EC46E', 'hex');

/* Producer Account */
const producerAdress = '0xa633AD53b97317FCD7393B14509EB5D9fb19abcA';
const producerPrivateKey = Buffer.from('031FA70A7BB8E1BF7CF6710B7A71AFD7D3C205141B864DF6DF57B2187F8CF1D1', 'hex');

//From Addresses
//const fromAccount = '0xa633AD53b97317FCD7393B14509EB5D9fb19abcA'; // Ganache
//const privateKey = Buffer.from('031FA70A7BB8E1BF7CF6710B7A71AFD7D3C205141B864DF6DF57B2187F8CF1D1', 'hex');
//To Address
//var toAddress = "0x1433D083c48609862a536b78D3777adFc20601ad";

//Contract Address
const contractAddress = '0xb25901e0c05a6b3ddc86e7b51611bb9ca1113e29'; // Deployed manually

const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];

//Create Contract Instance
const contract = new web3.eth.Contract(abi, contractAddress, {
  from: reclothesAdress,
  gasLimit: 3000000,
});

function getContract(){
  return contract;
}

function getUserAccount(){
  return user1Adress;
}

function getReclothesAccount(){
  return reclothesAdress;
}

function getProducerAccount(){
  return producerAdress;
}

function getPrivateKey(user){

  if(user.localeCompare("user")==0){
      return user1PrivateKey;
  } else if (user.localeCompare("reclothes")==0) {
    return reclothesPrivateKey;
  } else {
    return producerPrivateKey;
  }

}

/*********************************************************/
/*********************** MODULES *************************/
/*********************************************************/

//export module
module.exports = {

// Transfer ERC20 Token
transfer: function(from, to, txAmount) {

  console.log("=== Entering In ERC20 Transaction ===");
  console.log("=== VALUES => From: " + from + " - To: " + to + " - Amount: " + txAmount + " ===");
  console.log("=== Contract Address: " + contractAddress + "===");

  //var contract = getContract();
  var fromAccount;
  var toAddress;
  var privateKey;

  // GET From Address
  if(from.localeCompare("user")==0){
      console.log("=== From => USER ===");
      fromAccount = getUserAccount();
      privateKey = getPrivateKey("user");
  } else if (from.localeCompare("reclothes")==0) {
    console.log("=== From => RECLOTHES ===");
    fromAccount = getReclothesAccount();
    privateKey = getPrivateKey("reclothes");
  } else {
    console.log("=== From => PRODUCER ===");
    fromAccount = getProducerAccount();
    privateKey = getPrivateKey("producer");
  }

  console.log("=== From Account Taken " + fromAccount + " - PrivateKey: " + privateKey + " ===");

  // GET To Address
  if(to.localeCompare("user")==0){
    console.log("=== To => USER ===");
    toAddress = getUserAccount();
  } else if (to.localeCompare("reclothes")==0) {
    console.log("=== To => RECLOTHES ===");
    toAddress = getReclothesAccount();
  } else {
    console.log("=== To => PRODUCER ===");
    toAddress = getProducerAccount();
  }

  console.log("=== To Account Taken  " + toAddress + " ===");

  var amount = txAmount*100000000; //9700000000;
  const contractFunction = contract.methods.transfer(toAddress, amount);
  const functionAbi = contractFunction.encodeABI();

  var estimatedGas;
  var nonce;

  console.log("=== Getting gas estimate for Amount: " + amount + "===");

  contractFunction.estimateGas({from: fromAccount}).then((gasAmount) => {
    estimatedGas = "0x1";//"0x0bc9";//gasAmount.toString(16);

    console.log("Estimated gas: " + estimatedGas);

    web3.eth.getTransactionCount(fromAccount).then(_nonce => {
      nonce = _nonce.toString(16);

      console.log("Nonce: " + nonce);
      const txParams = {
        gasPrice: estimatedGas,//'0x09184e72a000',
        gasLimit: 3000000,
        to: contractAddress,
        data: functionAbi,
        from: fromAccount,
        nonce: '0x' + nonce,
        chainId: 0x03
      };

      console.log("=== Tx Parameters created ===");

      const tx = new Tx(txParams, {'chain':'ropsten'});
      tx.sign(privateKey);

      console.log("=== Tx Signed ===");

      const serializedTx = tx.serialize();

      console.log("=== Tx Serialized ===");

      //contract.methods.get().call().then(h => console.log("Transfer success: " + h));
      contract.methods.balanceOf(fromAccount).call().then(function(balance){console.log("=== Balance: " + balance + " ===")});

      web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
        //console.log(receipt);
        console.log("TransactionHash " + receipt.transactionHash);
        console.log("View transaction state: https://ropsten.etherscan.io/tx/" + receipt.transactionHash);
        //contract.methods.get().call().then(v => console.log("Value after increment: " + v));
      }).catch(error => { console.log(error); });
    }).catch(err => console.log("Error during Transaction: " + err));
  });

}


}
