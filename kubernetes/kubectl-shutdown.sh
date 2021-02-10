#!/bin/bash

kubectl delete secret bounties-mysql-db-secret
kubectl delete secret bounties-keycloak-db-secret
kubectl delete -f bounties-mysql-deployment.yml
kubectl delete -f bounties-redis-deployment.yml
kubectl delete -f bounties-kafka-deployment.yml
kubectl delete -f bounties-keycloak-deployment.yml
kubectl delete -f bounties-server-deployment.yml
kubectl delete -f bounties-keycloak-realm-configmap.yml
kubectl delete -f bounties-mysql-deployment.yml
