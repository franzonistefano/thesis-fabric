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
  
 
## 4. Run Web Application
