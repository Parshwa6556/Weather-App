pipeline {
    agent any
    tools {
        sonarQubeScanner 'SonarQube Scanner'  // The name must match your configuration
    }
    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                bat 'npm test'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {  // Ensure this matches your SonarQube name in Jenkins
                        bat "sonar-scanner -Dsonar.projectKey=my-nodejs-project"
                    }
                }
            }
        }
        stage('Quality Gate') {
            steps {
                script {
                    waitForQualityGate()
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
}
