#!/bin/bash

# STOP AND DELETE THE DOCKER CONTAINERS
#docker ps -aq | xargs -n 1 docker stop
#docker ps -aq | xargs -n 1 docker rm -v
docker-compose down -v
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)

# DELETE THE OLD DOCKER VOLUMES
docker volume prune

# DELETE OLD DOCKER NETWORKS (OPTIONAL: seems to restart fine without)
#docker network prune

# DELETE SCRIPT-CREATED FILES
#rm -rf channel-artifacts/*.block channel-artifacts/*.tx crypto-config 
rm -rf channel-artifacts/*.block channel-artifacts/*.tx crypto-config
rm -f docker-compose-e2e.yaml

# VERIFY RESULTS
docker ps -a
docker volume ls
ls -l
