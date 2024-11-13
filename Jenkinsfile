pipeline {
    agent any

    environment {
        // Define the registry URL and Nexus credentials
        NEXUS_URL = "http://localhost:8081/repository/WeatherApp/"
        NEXUS_USERNAME = "admin"
        NEXUS_PASSWORD = "Parshwa@9099"
        NEXUS_TOKEN = "0898ee46-6ee2-31cc-98d3-c3c7acea1403"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from version control
                git 'https://github.com/Parshwa6556/Weather-App.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Set up Node.js and install dependencies
                script {
                    def nodejs = tool name: 'NodeJS-20.17.0', type: 'NodeJSInstallation' // Reference the correct tool name
                    env.PATH = "${nodejs}/bin:${env.PATH}"
                }
                sh 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                // Run build if needed (e.g., webpack, typescript compilation)
                sh 'npm run build'
            }
        }

        stage('Publish to Nexus') {
            steps {
                // Create .npmrc file with Nexus credentials dynamically
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
