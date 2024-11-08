pipeline {
    agent any
    tools {
        sonarScanner 'SonarQube Scanner'  // Make sure this matches the tool name in Jenkins configuration
    }

    environment {
        SONAR_TOKEN = credentials('your-sonar-token-id')  // Reference the token stored in Jenkins
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
                    withSonarQubeEnv('SonarQube') {
                        bat "sonar-scanner -Dsonar.projectKey=nodejs-app -Dsonar.login=$SONAR_TOKEN"  // Use the token securely
                    }
                }
            }
        }
        stage('Quality Gate') {
            steps {
                script {
                    waitForQualityGate()  // Wait for SonarQube quality gate results
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
