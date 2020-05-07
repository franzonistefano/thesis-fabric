#!/bin/bash

export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

# For Channel all

peer channel create -o orderer.example.com:7050 -c channelall -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/channelall.tx --tls --cafile $ORDERER_CA

peer channel join -b channelall.block --tls --cafile $ORDERER_CA

peer channel update -o orderer.example.com:7050 -c channelall -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/Org1MSPanchors_channelall.tx --tls --cafile $ORDERER_CA


# For channel12

peer channel create -o orderer.example.com:7050 -c channel12 -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/channel12.tx --tls --cafile $ORDERER_CA

peer channel join -b channel12.block --tls --cafile $ORDERER_CA

peer channel update -o orderer.example.com:7050 -c channel12 -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/Org1MSPanchors_channel12.tx --tls --cafile $ORDERER_CA
