# ReClothes App

## Overview 
The goal of this repository is to:
1. instantiate and install [fabric-chaincode-evm](https://github.com/hyperledger/fabric-chaincode-evm)
2. run fabproxy, in order to allow communications between client and fabric network
2. run web-app to interact and test smart contract

## Prerequisite

1. [Fabric Sample](https://github.com/hyperledger/fabric-samples) - check [prerequisites](https://hyperledger-fabric.readthedocs.io/en/latest/prereqs.html) 
2. [fabric-chaincode-evm](https://github.com/hyperledger/fabric-chaincode-evm)

## 1. Install Chaincode EVM

> After running the first-network 

Install the **fabric-chaincode-evm**:
1. copy the `script/network/install_evm.sh` in the repository `go/src/github.com/hyperledger/fabric-samples/first-network/script/`
2. run command `docker exec -it cli bash`
3. move to script repository `cd script`
4. run install script `./install_evm.sh`
5. `exit` 

## 2. Run Fab3

Now We are going to run the fabproxy in order to allow communication between client and Fabric Network.

in `script/chaincode/` there's 3 `fab3_run.sh` files, each `.sh` file run an instance of fabproxy on a different *PORT* and associated to a different fabric *USER* with a different *ETH ADDRESS* generated on the fly. 

- `fab3_run.sh` will run on http://localhost:5000 and will map **User1** of **Org2**
- `fab3_run2.sh` will run on http://localhost:5001 and will map **User1** of **Org1**
- `fab3_run3.sh` will run on http://localhost:5002 and will map **User2** of **Org1** 

## 3. Deploy the Smart Contract

Next, we'll install the web3 dependency and than we are going to run `install.js` to deploy the BoxPoints smart contract.

### Install Web3

Web3.js is a library that allow to deploy and interact solidity smartcontract. 

Build the dependencies including the `web3@0.20.2` by navigating to web-app folder from the root directory and running the `npm install` command:

```
cd web-app
npm install
npm list web3 #To check web3 version

``` 
### Deploy Smart Contract

> First instance of Fab3 that run on PORT:5000 must to be run before to deploy smart contract.

To deploy the smart contract we have to run

```
node install.js
```
 
The js file will deploy the contract on the network and return the **`contract address`**. It must be copied and paste in **`dapp.js`**

## 4. Run Web Application

### Set up Folders

> Optionally you could follow this tips to test as best the web-app locally

I copied the **`web-app`** folder, in order to create 3 different folder, 1 for each user to be run

1. **`web-app-admin`**, it just match fab3 options
2. **`web-app-user1`**, you must to change localhost PORT:5001 of Fab3 in *`dapp.js`*, and PORT:8001 of the app running in *`app.js`* at the end of the file
3. **`web-app-user2`**, you must to change localhost PORT:5002 of Fab3 in *`dapp.js`*, and PORT:8002 of the app running in *`app.js`* at the end of the file

### Run 

Once is everything setted up we could run web application

```
cd web-app-admin
npm start
```

the application will run on **`localhost:8000`**

Repeat the same command for `web-app-user1` and `web-app-user2` that will run respectively on `localhost:8001` and `localhost:8002`


