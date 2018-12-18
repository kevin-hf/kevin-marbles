#!/bin/bash

set -ev

# Shut down the Docker containers that might be currently running.
# docker-compose -f ../artifacts/docker-compose.yaml stop

set -e

# Shut down the Docker containers for the system tests.
docker-compose -f ../artifacts/docker-compose.yaml kill && docker-compose -f ../artifacts/docker-compose.yaml down

# remove the local state
rm -rf ../hfc-key-store

# remove chaincode docker images
docker rm -f $(docker ps -aq)
docker rmi -f $(docker images | grep dev | awk '{print $3}')

# Your system is now clean
