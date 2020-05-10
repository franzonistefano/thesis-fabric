#!/bin/bash

export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

# Org2 Initialization and join channels
export CORE_PEER_LOCALMSPID=Org2MSP
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export CORE_PEER_ADDRESS=peer0.org2.example.com:7051

# For Channel 12
if peer channel list | grep -w channel12 > /dev/null
then
  echo "hyperledger fabric new channel channel12 already exists."
else

peer channel join -b channel12.block --tls --cafile $ORDERER_CA

peer channel update -o orderer.example.com:7050 -c channel12 -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/Org2MSPanchors_channel12.tx --tls --cafile $ORDERER_CA

fi

# For channel23

if peer channel list | grep -w channel23 > /dev/null
then
  echo "hyperledger fabric new channel channel23 already exists."
else

peer channel create -o orderer.example.com:7050 -c channel23 -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/channel23.tx --tls --cafile $ORDERER_CA

peer channel join -b channel23.block --tls --cafile $ORDERER_CA

peer channel update -o orderer.example.com:7050 -c channel23 -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/Org2MSPanchors_channel23.tx --tls --cafile $ORDERER_CA

fi

echo "+++ " $CORE_PEER_ADDRESS " CHANNEL LIST: [" $(peer channel list) "] +++"
