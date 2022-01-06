node {
  def commit_id

  stage('Preparation') {
    checkout scm
    sh "git rev-parse --short HEAD > .git/commit-id"
    commit_id = readFile('.git/commit-id').trim()
  }
  stage('Docker Build and Push') {
    dockerBuildAndPublish {
      repositoryName('jamesgiesbrecht/james-giesbrecht-ca')
      tag(commit_id)
      registryCredentials('dockerhub')
      forcePull(false)
      forceTag(false)
      createFingerprints(false)
      skipDecorate()
    }
  }
}
