#!/bin/bash

export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

# Org2 Initialization and join channels
export CORE_PEER_LOCALMSPID=Org2MSP
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export CORE_PEER_ADDRESS=peer0.org2.example.com:7051

export CHANNEL_ONE_NAME=channel12
export CHANNEL_TWO_NAME=channel23

# For Channel12
if peer channel list | grep -w ${CHANNEL_ONE_NAME} > /dev/null
then
  echo "hyperledger fabric new channel " $CHANNEL_ONE_NAME " already exists."
else

echo "++++++ " $CORE_PEER_ADDRESS " join to " $CHANNEL_ONE_NAME " ++++++"

peer channel join -b ${CHANNEL_ONE_NAME}.block --tls --cafile $ORDERER_CA

peer channel update -o orderer.example.com:7050 -c ${CHANNEL_ONE_NAME} -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/Org2MSPanchors_${CHANNEL_ONE_NAME}.tx --tls --cafile $ORDERER_CA

fi

# For channel23
if peer channel list | grep -w ${CHANNEL_TWO_NAME} > /dev/null
then
  echo "hyperledger fabric new channel " ${CHANNEL_TWO_NAME} " already exists."
else

echo "##### " $CORE_PEER_ADDRESS " create and join to " ${CHANNEL_TWO_NAME} " #####"

peer channel create -o orderer.example.com:7050 -c ${CHANNEL_TWO_NAME} -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/${CHANNEL_TWO_NAME}.tx --tls --cafile $ORDERER_CA

peer channel join -b ${CHANNEL_TWO_NAME}.block --tls --cafile $ORDERER_CA

peer channel update -o orderer.example.com:7050 -c ${CHANNEL_TWO_NAME} -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/Org2MSPanchors_${CHANNEL_TWO_NAME}.tx --tls --cafile $ORDERER_CA

fi

echo "##### " $CORE_PEER_ADDRESS " CHANNEL LIST: [" $(peer channel list) "] #####"

exit
