#!/bin/bash

echo "Setting Up Bounties service configuration..."
kubectl create secret generic bounties-keycloak-db-secret --from-literal=username=admin --from-literal=password=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 16)
kubectl create secret generic bounties-mysql-db-secret --from-literal=username=root --from-literal=password=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 16)

echo
echo "Setting up config map for mysql db"
kubectl apply -f bounties-mysql-deployment.yml

echo
echo "Starting bounties-mysql..."
kubectl apply -f ./bounties-mysql-deployment.yml

echo
echo "Setting up config map for keycloak"
kubectl apply -f bounties-keycloak-realm-configmap.yml
# kubectl apply -f bounties-keycloak-users-configmap.yml

echo
echo "Starting bounties-keycloak..."
kubectl apply -f bounties-keycloak-deployment.yml

echo
echo "Starting bounties-redis..."
kubectl apply -f bounties-redis-deployment.yml

echo
echo "Starting bounties-kafka..."
kubectl apply -f bounties-kafka-deployment.yml

echo
echo "Starting bounties server..."
kubectl apply -f bounties-server-deployment.yml

echo "Bounties server is up and running"