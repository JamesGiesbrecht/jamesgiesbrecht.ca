#!/usr/bin/env groovy
def commit_id

pipeline {
  agent any
  parameters {
    choice(
      name: 'DEPLOY_ENV',
      description: 'dev OR prod. Prod will not deploy if branch is not master',
      choices: ['dev', 'prod'],
    )
    string(
      defaultValue: 'dev',
      description: 'Branch to build from',
      name: 'BRANCH'
    )
  }
  environment {
      CONTAINER_NAME                      = 'james-giesbrecht-ca-dev'
      MONGODB_USER                        = credentials('MONGODB_USER')
      MONGODB_PASSWORD                    = credentials('MONGODB_PASSWORD')
      MONGODB_URL                         = credentials('MONGODB_URL_DEV')
      MONGODB_PARAMS                      = credentials('MONGODB_PARAMS')
      PLEX_SERVER_URL                     = credentials('PLEX_SERVER_URL_LOCAL')
      PLEX_TOKEN                          = credentials('PLEX_TOKEN')
      ADMIN_SERVICE_ACCOUNT_JSON_CONFIG   = credentials('ADMIN_SERVICE_ACCOUNT_JSON_CONFIG')
      UNRAID_PORT                         = credentials('UNRAID_PORT_DEV')
      NEXT_PUBLIC_FIREBASE_API_KEY        = credentials('NEXT_PUBLIC_FIREBASE_API_KEY')
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN    = credentials('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN')
      NEXT_PUBLIC_FIREBASE_PROJECT_ID     = credentials('NEXT_PUBLIC_FIREBASE_PROJECT_ID')
      NEXT_PUBLIC_FIREBASE_SENDER_ID      = credentials('NEXT_PUBLIC_FIREBASE_SENDER_ID')
      NEXT_PUBLIC_FIREBASE_APP_ID         = credentials('NEXT_PUBLIC_FIREBASE_APP_ID')
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = credentials('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID')
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
              """--build-arg FIREBASE_API_KEY='${NEXT_PUBLIC_FIREBASE_API_KEY}' \
              --build-arg FIREBASE_AUTH_DOMAIN='${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}' \
              --build-arg FIREBASE_PROJECT_ID='${NEXT_PUBLIC_FIREBASE_PROJECT_ID}' \
              --build-arg FIREBASE_SENDER_ID='${NEXT_PUBLIC_FIREBASE_SENDER_ID}' \
              --build-arg FIREBASE_APP_ID='${NEXT_PUBLIC_FIREBASE_APP_ID}' \
              --build-arg FIREBASE_MEASUREMENT_ID='${NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}' \
              --target prod \
              -f Dockerfile ."""
            ).push()
          }
          echo "Attempting to deploy branch ${BRANCH} to ${DEPLOY_ENV}"
        }
      }
    }
    stage('Production Deploy') {
      when {
        allOf {
            environment name: 'BRANCH', value: 'master'
            environment name: 'DEPLOY_ENV', value: 'prod'
        }
      }
      environment {
        UNRAID_PORT = credentials('UNRAID_PORT_PROD')
        MONGODB_URL_PROD = credentials('MONGODB_URL_PROD')
        CONTAINER_NAME = 'james-giesbrecht-ca-prod'
      }
      steps {
        script {
          echo 'Deploying to production...'

          sh "docker stop ${CONTAINER_NAME} || true"

          sh "docker rm ${CONTAINER_NAME} || true"

          sh """docker run \
                  -d \
                  --name='${CONTAINER_NAME}' \
                  --net='bridge' \
                  -e 'MONGODB_USER'='${MONGODB_USER}' \
                  -e 'MONGODB_PASSWORD'='${MONGODB_PASSWORD}' \
                  -e 'MONGODB_URL'='${MONGODB_URL}' \
                  -e 'MONGODB_PARAMS'='${MONGODB_PARAMS}' \
                  -e 'PLEX_SERVER_URL'='${PLEX_SERVER_URL}' \
                  -e 'PLEX_TOKEN'='${PLEX_TOKEN}' \
                  -e 'ADMIN_SERVICE_ACCOUNT_JSON_CONFIG'='${ADMIN_SERVICE_ACCOUNT_JSON_CONFIG}' \
                  -p '${UNRAID_PORT}:3001' \
                  'jamesgiesbrecht/james-giesbrecht-ca:${commit_id}'"""
        }
      }
    }
    stage('Development Deploy') {
      when {
        allOf {
            environment name: 'DEPLOY_ENV', value: 'dev'
        }
      }
      steps {
        script {
          echo 'Deploying to dev...'

          sh "docker stop ${CONTAINER_NAME} || true"

          sh "docker rm ${CONTAINER_NAME} || true"

          sh """docker run \
                  -d \
                  --name='${CONTAINER_NAME}' \
                  --net='bridge' \
                  -e 'MONGODB_USER'='${MONGODB_USER}' \
                  -e 'MONGODB_PASSWORD'='${MONGODB_PASSWORD}' \
                  -e 'MONGODB_URL'='${MONGODB_URL}' \
                  -e 'MONGODB_PARAMS'='${MONGODB_PARAMS}' \
                  -e 'PLEX_SERVER_URL'='${PLEX_SERVER_URL}' \
                  -e 'PLEX_TOKEN'='${PLEX_TOKEN}' \
                  -e 'ADMIN_SERVICE_ACCOUNT_JSON_CONFIG'='${ADMIN_SERVICE_ACCOUNT_JSON_CONFIG}' \
                  -p '${UNRAID_PORT}:3001' \
                  'jamesgiesbrecht/james-giesbrecht-ca:${commit_id}'"""
        }
      }
    }
  }
}
