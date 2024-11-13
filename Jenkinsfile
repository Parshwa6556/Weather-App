pipeline {
    agent any
    environment {
        // Define Nexus URL and credentials
        NEXUS_URL = "http://localhost:8081/repository/WeatherApp/"
        NEXUS_USERNAME = "admin"
        NEXUS_PASSWORD = "Parshwa@9099"
        NEXUS_TOKEN = "0898ee46-6ee2-31cc-98d3-c3c7acea1403"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the Git repository
                checkout scm
                script {
                    // Ensure it checks out the 'main' branch
                    sh 'git checkout main'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    def nodejs = tool name: 'NodeJS 23.1.0', type: 'NodeJSInstallation'

                    env.PATH = "${nodejs}/bin:${env.PATH}"
                }
                sh 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Publish to Nexus') {
            steps {
                writeFile file: '.npmrc', text: """
                    //localhost:8081/repository/WeatherApp/:username=${NEXUS_USERNAME}
                    //localhost:8081/repository/WeatherApp/:password=${NEXUS_PASSWORD}
                    //localhost:8081/repository/WeatherApp/:_authToken=${NEXUS_TOKEN}
                    //localhost:8081/repository/WeatherApp/:always-auth=true
                """
                sh 'npm publish --registry=${NEXUS_URL}'
            }
        }
    }

    post {
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
