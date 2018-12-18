#!/bin/bash
set -ev
export MSYS_NO_PATHCONV=1
export COMPOSE_PROJECT_NAME=net

docker-compose -f ../artifacts/docker-compose.yaml down

rm -rf ../hfc-key-store

docker-compose -f ../artifacts/docker-compose.yaml up -d ca.org1.kevin.chaindesk.cn orderer.kevin.chaindesk.cn peer0.org1.kevin.chaindesk.cn

# wait for Hyperledger Fabric to start
# incase of errors when running later commands, issue export FABRIC_START_TIMEOUT=<larger number>
export FABRIC_START_TIMEOUT=10
#echo ${FABRIC_START_TIMEOUT}
sleep ${FABRIC_START_TIMEOUT}

# Create the channel
docker exec -e "CORE_PEER_LOCALMSPID=org1.kevin.chaindesk.cn" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.kevin.chaindesk.cn/msp" peer0.org1.kevin.chaindesk.cn peer channel create -o orderer.kevin.chaindesk.cn:7050 -c kevinchaindesk -f /etc/hyperledger/configtx/channel.tx
# Join peer0.org1.kevin.chaindesk.cn to the channel.
docker exec -e "CORE_PEER_LOCALMSPID=org1.kevin.chaindesk.cn" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.kevin.chaindesk.cn/msp" peer0.org1.kevin.chaindesk.cn peer channel join -b kevinchaindesk.block
