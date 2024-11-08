pipeline {
    agent any
    tools {
        // Use the correct SonarQube Scanner installation name
        sonarScanner 'SonarQube Scanner'  // Correct tool declaration here
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
                    // The server name 'SonarQube' should match the name you set in Jenkins configuration
                    withSonarQubeEnv('SonarQube') {  
                        bat "sonar-scanner -Dsonar.projectKey=my-nodejs-project"
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
