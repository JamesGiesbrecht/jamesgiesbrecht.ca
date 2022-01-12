#!/usr/bin/env groovy
def commit_id
def container_name = 'james-giesbrecht-ca-dev2'

pipeline {
  agent any
  environment {
      MONGODB_USER                      = credentials('MONGODB_USER')
      MONGODB_PASSWORD                  = credentials('MONGODB_PASSWORD')
      MONGODB_URL                       = credentials('MONGODB_URL_DEV')
      MONGODB_PARAMS                    = credentials('MONGODB_PARAMS')
      PLEX_SERVER_URL                   = credentials('PLEX_SERVER_URL_LOCAL')
      PLEX_TOKEN                        = credentials('PLEX_TOKEN')
      ADMIN_SERVICE_ACCOUNT_JSON_CONFIG = credentials('ADMIN_SERVICE_ACCOUNT_JSON_CONFIG')
      UNRAID_PORT                       = credentials('UNRAID_PORT_DEV')
      REACT_APP_FIREBASE_API_KEY        = credentials('REACT_APP_FIREBASE_API_KEY')
      REACT_APP_AUTH_DOMAIN             = credentials('REACT_APP_AUTH_DOMAIN')
      REACT_APP_FIREBASE_PROJECT_ID     = credentials('REACT_APP_FIREBASE_PROJECT_ID')
      REACT_APP_FIREBASE_SENDER_ID      = credentials('REACT_APP_FIREBASE_SENDER_ID')
      REACT_APP_FIREBASE_APP_ID         = credentials('REACT_APP_FIREBASE_APP_ID')
      REACT_APP_FIREBASE_MEASUREMENT_ID = credentials('REACT_APP_FIREBASE_MEASUREMENT_ID')
  }
  stages {
    stage('Preparation') {
      steps {
        checkout scm
        script {
          sh "git rev-parse --short HEAD > .git/commit-id"
          commit_id = readFile('.git/commit-id').trim()
        }
      }
    }
    stage('Docker Build and Publish') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
            def app = docker.build(
              "jamesgiesbrecht/james-giesbrecht-ca:${commit_id}",
              """--build-arg REACT_APP_FIREBASE_API_KEY='${REACT_APP_FIREBASE_API_KEY}' \
              --build-arg REACT_APP_AUTH_DOMAIN='${REACT_APP_AUTH_DOMAIN}' \
              --build-arg REACT_APP_FIREBASE_PROJECT_ID='${REACT_APP_FIREBASE_PROJECT_ID}' \
              --build-arg REACT_APP_FIREBASE_SENDER_ID='${REACT_APP_FIREBASE_SENDER_ID}' \
              --build-arg REACT_APP_FIREBASE_APP_ID='${REACT_APP_FIREBASE_APP_ID}' \
              --build-arg REACT_APP_FIREBASE_MEASUREMENT_ID='${REACT_APP_FIREBASE_MEASUREMENT_ID}' \
              -f Dockerfile ."""
            ).push()
          }
        }
      }
    }
    stage('Docker Deploy') {
      steps {
        script {
          sh "docker stop ${container_name} || true"

          sh "docker rm ${container_name} || true"

          sh """docker create \
                  --name='${container_name}' \
                  -e 'MONGODB_USER'='${MONGODB_USER}' \
                  -e 'MONGODB_PASSWORD'='${MONGODB_PASSWORD}' \
                  -e 'MONGODB_URL'='${MONGODB_URL}' \
                  -e 'MONGODB_PARAMS'='${MONGODB_PARAMS}' \
                  -e 'PLEX_SERVER_URL'='${PLEX_SERVER_URL}' \
                  -e 'PLEX_TOKEN'='${PLEX_TOKEN}' \
                  -e 'ADMIN_SERVICE_ACCOUNT_JSON_CONFIG'='${ADMIN_SERVICE_ACCOUNT_JSON_CONFIG}' \
                  -p '${UNRAID_PORT}:3001/tcp' \
                  'jamesgiesbrecht/james-giesbrecht-ca:${commit_id}'"""

          sh "docker start ${container_name}"
        }
      }
    }
  }
}
