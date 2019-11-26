
pipeline {
    agent any

    environment {
        dockerImage = ''
        MAVEN_OPTS = '-Djansi.force=true'
    }


    tools { 
        maven 'maven' 
        jdk 'jdk' 
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        ansiColor('xterm')
    }

    stages {
        stage('Build') {
            steps {
                sh 'ng build'
            }
        }
        stage('Test') {
            steps {
                sh 'ng test'
            }
        }
        stage('Sonarqube') {
            steps {
                sh """
                sonar-scanner \
                -Dsonar.projectKey=testangular \
                -Dsonar.sources=. \
                -Dsonar.host.url=http://52.76.237.240:9000 \
                -Dsonar.login=2f1d3e073dd06a4a10f92a11a4ff92705ebf694d
                """
            }
        }
    }
}