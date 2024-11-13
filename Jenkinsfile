pipeline {
    agent any

    environment {
        // Set the environment variable to use SonarQube
        SONARQUBE_SERVER = 'SonarQube'  // Use the name given in Jenkins SonarQube config
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone your repository
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    // Replace 'my-nodejs-project' with your actual SonarQube project key
                    sh 'sonar-scanner -Dsonar.projectKey=my-nodejs-project -Dsonar.sources=.'  
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    // Wait for SonarQube quality gate result
                    timeout(time: 1, unit: 'MINUTES') {
                        waitForQualityGate abortPipeline: true
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'SonarQube analysis completed successfully.'
        }
        failure {
            echo 'SonarQube analysis failed.'
        }
    }
}
