#!/bin/bash

# set GOPATH
export GOPATH=$HOME/go

# Environment variables required for setting up Fab3
export FAB3_CONFIG=${GOPATH}/src/github.com/hyperledger/fabric-chaincode-evm/examples/first-network-sdk-config.yaml # Path to a compatible Fabric SDK Go config file
export FAB3_USER=User1 # User identity being used for the proxy (Matches the users names in the crypto-config directory specified in the config)
export FAB3_ORG=Org2  # Organization of the specified user
export FAB3_CHANNEL=mychannel # Channel to be used for the transactions
export FAB3_CCID=evmcc # ID of the EVM Chaincode deployed in your fabric network
export FAB3_PORT=5000 # Port the proxy will listen on. If not provided default is 5000.


cd $GOPATH/src/github.com/hyperledger/fabric-chaincode-evm/bin/

#go build -o fab3 ../fab3/cmd

./fab3
