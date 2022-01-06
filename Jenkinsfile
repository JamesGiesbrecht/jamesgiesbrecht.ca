node {
  def commit_id

  stage('Preparation') {
    checkout scm
    sh "git rev-parse --short HEAD > .git/commit-id"
    commit_id = readFile('.git/commit-id').trim()
  }
  stage('Docker Build and Push') {
    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
      def app = docker.build("jamesgiesbrecht/james-giesbrecht-ca:${commit_id}").push()
    }
  }
}
