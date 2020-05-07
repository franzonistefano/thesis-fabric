#!/bin/bash

#Generate crypto material for organizations
../bin/cryptogen generate --config=./crypto-config.yaml

# Build channel artifact
./channel_artifact.sh


# Run up docker containers
docker-compose up -d

docker ps

# Org1 Initialization and join channels
docker exec cli scripts/org1_init.sh

# Install and Instantiate evmcc 
docker exec cli scripts/install.sh


