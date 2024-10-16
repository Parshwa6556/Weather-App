# Use the Node.js 20.17.0 base image
FROM node:20.17.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies inside the container
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port the app will run on (in this case, port 3000)
EXPOSE 3000

# Start the app (this assumes "npm start" is set to run your server in package.json)
CMD ["npm", "start"]
