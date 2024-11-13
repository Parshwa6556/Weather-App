pipeline {
    agent any

    environment {
        NEXUS_URL = "http://localhost:8081/repository/WeatherApp/"
        NEXUS_USERNAME = "admin"
        NEXUS_PASSWORD = "Parshwa@9099"
        NEXUS_TOKEN = "0898ee46-6ee2-31cc-98d3-c3c7acea1403"
    }

    tools {
        // Ensure the Node.js installation name here matches the Jenkins configuration (e.g., NodeJS 20.17.0)
        nodejs 'NodeJS 20.17.0'
    }

    stages {
        stage('Checkout') {
            steps {
                // Explicitly specify the branch name
                git branch: 'main', url: 'https://github.com/Parshwa6556/Weather-App.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Ensure Node.js is available in PATH and install dependencies
                sh 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                // Run any build commands (optional)
                sh 'npm run build'
            }
        }

        stage('Publish to Nexus') {
            steps {
                // Create .npmrc file dynamically for Nexus authentication
                writeFile file: '.npmrc', text: """
                    //localhost:8081/repository/WeatherApp/:username=${NEXUS_USERNAME}
                    //localhost:8081/repository/WeatherApp/:password=${NEXUS_PASSWORD}
                    //localhost:8081/repository/WeatherApp/:_authToken=${NEXUS_TOKEN}
                    //localhost:8081/repository/WeatherApp/:always-auth=true
                """

                // Publish npm package to Nexus
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
