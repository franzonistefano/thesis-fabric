#!/bin/bash

# set GOPATH
export GOPATH=$HOME/go

# Environment variables required for setting up Fab3
export FABPROXY_CONFIG=${GOPATH}/src/github.com/hyperledger/fabric-chaincode-evm/examples/first-network-sdk-config.yaml # Path to a compatible Fabric SDK Go config file
export FABPROXY_USER=User2 # User identity being used for the proxy (Matches the users names in the crypto-config directory specified in the config)
export FABPROXY_ORG=Org1  # Organization of the specified user
export FABPROXY_CHANNEL=mychannel # Channel to be used for the transactions
export FABPROXY_CCID=evmcc # ID of the EVM Chaincode deployed in your fabric network
export PORT=5002 # Port the proxy will listen on. If not provided default is 5001.


cd $GOPATH/src/github.com/hyperledger/fabric-chaincode-evm/

#go build -o fab3 ./fabproxy/cmd

./fab3
