job('JamesGiesbrecht.ca') {
    scm {
        git('git://github.com/JamesGiesbrecht/james-giesbrecht.git') {  node -> // is hudson.plugins.git.GitSCM
            node / gitConfigName('Jenkins DSL User')
            node / gitConfigEmail('jenkins-dsl@jamesgiesbrecht.ca')
        }
    }
    triggers {
        scm('H/5 * * * *')
    }
    wrappers {
        nodejs('nodejs') // this is the name of the NodeJS installation in
                         // Manage Jenkins -> Configure Tools -> NodeJS Installations -> Name
    }
    steps {
        dockerBuildAndPublish {
            repositoryName('jamesgiesbrecht/james-giesbrecht-ca')
            tag('${GIT_REVISION,length=9}')
            registryCredentials('dockerhub')
            forcePull(false)
            forceTag(false)
            createFingerprints(false)
            skipDecorate()
        }
    }
}
