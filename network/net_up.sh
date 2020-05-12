#!/bin/bash

#Generate crypto material for organizations
../bin/cryptogen generate --config=./crypto-config.yaml

# Build channel artifact
./channel_artifact.sh


# Run up docker containers
docker-compose up -d

docker ps

# Org1 Initialization and join channels
echo
echo "######################################################"
echo "##### Init Org1 and join to the Channels #####"
echo "######################################################"
docker exec cli scripts/org1_init.sh

# Org2 Initialization and join channels
echo
echo "######################################################"
echo "##### Init Org2 and join to the Channels #####"
echo "######################################################"
docker exec cli scripts/org2_init.sh

# Org3 Initialization and join channels
echo
echo "######################################################"
echo "##### Init Org3 and join to the Channels #####"
echo "######################################################"
docker exec cli scripts/org3_init.sh

# Install and Instantiate evmcc
echo
echo "######################################################"
echo "##### Install Chanicode evm over the peers #####"
echo "######################################################"
docker exec cli scripts/install.sh
