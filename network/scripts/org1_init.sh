#!/bin/bash

export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

# For Channel 12
if peer channel list | grep -w channel12 > /dev/null
then
  echo "hyperledger fabric new channel channel12 already exists."
else

peer channel create -o orderer.example.com:7050 -c channel12 -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/channel12.tx --tls --cafile $ORDERER_CA

peer channel join -b channel12.block --tls --cafile $ORDERER_CA

peer channel update -o orderer.example.com:7050 -c channel12 -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/Org1MSPanchors_channel12.tx --tls --cafile $ORDERER_CA

fi

echo "+++ " $CORE_PEER_ADDRESS " CHANNEL LIST: [" $(peer channel list) "] +++"
