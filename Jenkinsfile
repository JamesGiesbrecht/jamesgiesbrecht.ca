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
    withCredentials([string(credentialsId: 'MONGODB_USER', variable: 'MONGODB_USER'), string(credentialsId: 'MONGODB_PASSWORD', variable: 'MONGODB_PASSWORD'), string(credentialsId: 'MONGODB_URL_DEV', variable: 'MONGODB_URL'), string(credentialsId: 'MONGODB_PARAMS', variable: 'MONGODB_PARAMS'), string(credentialsId: 'PLEX_SERVER_URL_LOCAL', variable: 'PLEX_SERVER_URL'), string(credentialsId: 'PLEX_TOKEN', variable: 'PLEX_TOKEN'), string(credentialsId: 'ADMIN_SERVICE_ACCOUNT_JSON_CONFIG', variable: 'ADMIN_SERVICE_ACCOUNT_JSON_CONFIG'), string(credentialsId: 'UNRAID_PORT_DEV', variable: 'UNRAID_PORT')]) {
      stage('Preparation') {
        checkout scm
        sh "git rev-parse --short HEAD > .git/commit-id"
        commit_id = readFile('.git/commit-id').trim()
      }
      stage('test') {
        println('A test has failed!')
        sh 'exit 1'
      }
      stage('Docker Build and Push') {
        docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
          def app = docker.build("jamesgiesbrecht/james-giesbrecht-ca:${commit_id}").push()
        }
      }
      stage('Docker Deploy') {
        sh "docker stop ${container_name}"

        sh "docker rm ${container_name}"

        sh "docker create --name='${container_name}' --net='bridge' -e TZ='America/Chicago' -e HOST_OS='Unraid' -e 'MONGODB_USER'='${MONGODB_USER}' -e 'MONGODB_PASSWORD'='${MONGODB_PASSWORD}' -e 'MONGODB_URL'='${MONGODB_URL}' -e 'MONGODB_PARAMS'='${MONGODB_PARAMS}' -e 'PLEX_SERVER_URL'='${PLEX_SERVER_URL}' -e 'PLEX_TOKEN'='${PLEX_TOKEN}' -e 'ADMIN_SERVICE_ACCOUNT_JSON_CONFIG'='${ADMIN_SERVICE_ACCOUNT_JSON_CONFIG}' -p '${UNRAID_PORT}:3001/tcp' 'jamesgiesbrecht/james-giesbrecht-ca:${commit_id}'"

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
