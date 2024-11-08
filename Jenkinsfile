pipeline {
    agent any
    tools {
        // Use the correct name for SonarQube Scanner from the Jenkins configuration
        // Ensure that 'SonarQube Scanner' is the name you configured in Jenkins tool configuration
        tool name: 'SonarQube Scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
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
                    // Ensure 'SonarQube' matches the name you configured in Jenkins for SonarQube server
                    withSonarQubeEnv('SonarQube') {  
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
