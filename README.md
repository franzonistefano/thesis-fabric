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

After running the first-network 

Install the fabric-chaincode-evm:
1. copy the 'script/network/install_evm.sh' in the repository 'go/src/github.com/hyperledger/fabric-samples/first-network/script/'
2. run command 'docker exec -it cli bash'
3. move to script repository 'cd script' 
4. run install script './install_evm.sh'
