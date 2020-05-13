#!/bin/bash

#Install and instantiate evm chaincode over peer0.org1
echo
echo "======== Install EVM chaincode over " $CORE_PEER_ADDRESS " ========"
# Next install the EVM chaincode on all the peers
peer chaincode install -n evmcc -l golang -v 0 -p github.com/hyperledger/fabric-chaincode-evm/evmcc

#########################################################################################

# To change which peer is targeted change the following environment variables
export CORE_PEER_LOCALMSPID=Org2MSP
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export CORE_PEER_ADDRESS=peer0.org2.example.com:8051
#export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
#export CORE_PEER_ADDRESS=peer1.org1.example.com:8051
#export CORE_PEER_LOCALMSPID="Org1MSP"
#export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt

# Next install the EVM chaincode on all the peers
echo
echo "======== Install EVM chaincode over " $CORE_PEER_ADDRESS " ========"
peer chaincode install -n evmcc -l golang -v 0 -p github.com/hyperledger/fabric-chaincode-evm/evmcc

# Instantiate the chaincode over chanel12
echo "======== Instantiate EVM chaincode over channel12 ========"
peer chaincode instantiate -n evmcc -v 0 -C channel12 -c '{"Args":[]}' -P 'AND ('\''Org1MSP.peer'\'','\''Org2MSP.peer'\'')' -o orderer.example.com:7050 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem



#########################################################################################


# To change which peer is targeted change the following environment variables
export CORE_PEER_LOCALMSPID=Org3MSP
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp
export CORE_PEER_ADDRESS=peer0.org3.example.com:9051

# Next install the EVM chaincode on all the peers
echo
echo "======== Install EVM chaincode over " $CORE_PEER_ADDRESS " ========"
peer chaincode install -n evmcc -l golang -v 0 -p github.com/hyperledger/fabric-chaincode-evm/evmcc

# Instantiate the chaincode over channel23
echo "======== Instantiate EVM chaincode over channel23 ========"
peer chaincode instantiate -n evmcc -v 0 -C channel23 -c '{"Args":[]}' -P 'AND ('\''Org2MSP.peer'\'','\''Org3MSP.peer'\'')' -o orderer.example.com:7050 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem


#########################################################################################

exit
