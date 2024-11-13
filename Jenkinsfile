pipeline {
    agent any

    environment {
        NEXUS_URL = "http://localhost:8081/repository/WeatherApp/"
        NEXUS_USERNAME = "admin"
        NEXUS_PASSWORD = "Parshwa@9099"
        NEXUS_TOKEN = "0898ee46-6ee2-31cc-98d3-c3c7acea1403"
    }

    tools {
        // Specify the Node.js installation name as "NodeJs"
        nodejs 'NodeJs'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Parshwa6556/Weather-App.git'
            }
        }

        stage('Install Dependencies') {
            steps {
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
