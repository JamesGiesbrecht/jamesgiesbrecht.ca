node {
  def commit_id
  def container_name = 'james-giesbrecht-ca-dev'

  // config
  def to = emailextrecipients([
          [$class: 'CulpritsRecipientProvider'],
          [$class: 'DevelopersRecipientProvider'],
          [$class: 'RequesterRecipientProvider']
  ])

  try {
    withCredentials([
      string(credentialsId: 'MONGODB_USER', variable: 'MONGODB_USER'),
      string(credentialsId: 'MONGODB_PASSWORD', variable: 'MONGODB_PASSWORD'),
      string(credentialsId: 'MONGODB_URL_DEV', variable: 'MONGODB_URL'),
      string(credentialsId: 'MONGODB_PARAMS', variable: 'MONGODB_PARAMS'),
      string(credentialsId: 'PLEX_SERVER_URL_LOCAL', variable: 'PLEX_SERVER_URL'),
      string(credentialsId: 'PLEX_TOKEN', variable: 'PLEX_TOKEN'),
      string(credentialsId: 'ADMIN_SERVICE_ACCOUNT_JSON_CONFIG', variable: 'ADMIN_SERVICE_ACCOUNT_JSON_CONFIG'),
      string(credentialsId: 'UNRAID_PORT_DEV', variable: 'UNRAID_PORT'),
      string(credentialsId: 'REACT_APP_FIREBASE_API_KEY', variable: 'REACT_APP_FIREBASE_API_KEY'),
      string(credentialsId: 'REACT_APP_AUTH_DOMAIN', variable: 'REACT_APP_AUTH_DOMAIN'),
      string(credentialsId: 'REACT_APP_FIREBASE_PROJECT_ID', variable: 'REACT_APP_FIREBASE_PROJECT_ID'),
      string(credentialsId: 'REACT_APP_FIREBASE_SENDER_ID', variable: 'REACT_APP_FIREBASE_SENDER_ID'),
      string(credentialsId: 'REACT_APP_FIREBASE_APP_ID', variable: 'REACT_APP_FIREBASE_APP_ID'),
      string(credentialsId: 'REACT_APP_FIREBASE_MEASUREMENT_ID', variable: 'REACT_APP_FIREBASE_MEASUREMENT_ID')
    ]) {
      stage('Preparation') {
        checkout scm
        sh "git rev-parse --short HEAD > .git/commit-id"
        commit_id = readFile('.git/commit-id').trim()
      }
      // stage('test') {
      //   println('A test has failed!')
      //   sh 'exit 1'
      // }
      stage('Docker Build and Push') {
        withEnv([
          "REACT_APP_FIREBASE_API_KEY=${REACT_APP_FIREBASE_API_KEY}",
          "REACT_APP_AUTH_DOMAIN=${REACT_APP_AUTH_DOMAIN}",
          "REACT_APP_FIREBASE_PROJECT_ID=${REACT_APP_FIREBASE_PROJECT_ID}",
          "REACT_APP_FIREBASE_SENDER_ID=${REACT_APP_FIREBASE_SENDER_ID}",
          "REACT_APP_FIREBASE_APP_ID=${REACT_APP_FIREBASE_APP_ID}",
          "REACT_APP_FIREBASE_MEASUREMENT_ID=${REACT_APP_FIREBASE_MEASUREMENT_ID}"
        ]) {
          docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
            script {
              def app = docker.build("--no-cache", "-t jamesgiesbrecht/james-giesbrecht-ca:${commit_id}").push()
            }
          }
        }
      }
      stage('Docker Deploy') {
        // Don't exit if the container does not exist
        sh """if [ ! "\$(docker ps -q -f name=${container_name})" ]; then
                echo "Container 1"
                if [ "\$(docker ps -aq -f status=exited -f name=${container_name})" ]; then
                    echo "Container 2"
                    docker stop ${container_name}
                    docker rm ${container_name}
                fi
              fi"""
        // sh "docker stop ${container_name} || true"

        // sh "docker rm ${container_name} || true"

        sh """docker create \
                --name='${container_name}' \
                --net='bridge' \
                -e TZ='America/Chicago' \
                -e HOST_OS='Unraid' \
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
  } catch(e) {
    currentBuild.result = "FAILURE";
    // email variables
    def subject = "${env.JOB_NAME} Build #${env.BUILD_NUMBER} ${currentBuild.result}";
    def content = '${JELLY_SCRIPT,template="html"}';

    // send email
    if(to != null && !to.isEmpty()) {
      emailext(body: content, mimeType: 'text/html',
         replyTo: '$DEFAULT_REPLYTO', subject: subject,
         to: to, attachLog: true )
    }

    // slackSend(color: 'danger', message: "${subject} ${env.BUILD_URL}")

    // mark current build as a failure and throw the error
    throw e;
  }
}
