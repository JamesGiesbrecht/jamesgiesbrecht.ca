// properties([pipelineTriggers([[$class: 'SCMTrigger', scmpoll_spec: 'H/1 * * * *']])])
node {
  def commit_id

  // config
  def to = emailextrecipients([
          [$class: 'CulpritsRecipientProvider'],
          [$class: 'DevelopersRecipientProvider'],
          [$class: 'RequesterRecipientProvider']
  ])

  try {
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
      docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
        def app = docker.build("jamesgiesbrecht/james-giesbrecht-ca:${commit_id}").push()
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
