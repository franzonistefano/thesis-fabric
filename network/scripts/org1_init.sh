#!/bin/bash

export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

export CHANNEL_NAME=channel12

# For Channel12
if peer channel list | grep -w ${CHANNEL_NAME} > /dev/null
then
  echo "hyperledger fabric new channel " $CHANNEL_NAME " already exists."
else

echo "##### " $CORE_PEER_ADDRESS " create and join to " $CHANNEL_NAME " #####"

peer channel create -o orderer.example.com:7050 -c ${CHANNEL_NAME} -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/${CHANNEL_NAME}.tx --tls --cafile $ORDERER_CA

peer channel join -b ${CHANNEL_NAME}.block --tls --cafile $ORDERER_CA

peer channel update -o orderer.example.com:7050 -c ${CHANNEL_NAME} -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/Org1MSPanchors_${CHANNEL_NAME}.tx --tls --cafile $ORDERER_CA

fi

echo "##### " $CORE_PEER_ADDRESS " CHANNEL LIST: [" $(peer channel list) "] #####"

exit
