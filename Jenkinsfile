pipeline {
    agent any

    environment {
        // Set SonarQube environment variables (configure SonarQube server in Jenkins first)
        SONARQUBE_SERVER = 'SonarQube' // The name you configured for SonarQube in Jenkins
    }

    stages {
        stage('Build') {
            steps {
                // Install dependencies
                bat 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                // Run tests
                bat 'npm test'
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                // Run SonarQube analysis
                withSonarQubeEnv('SonarQube') {
                    bat 'sonar-scanner -Dsonar.projectKey=my-nodejs-project'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    // Wait for the SonarQube Quality Gate to pass/fail
                    timeout(time: 1, unit: 'MINUTES') {
                        waitForQualityGate abortPipeline: true
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // Add deployment steps here (e.g., to Nexus, Docker, etc.)
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()  // Cleanup the workspace after the pipeline
        }
    }
}
