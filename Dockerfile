# Dockerfile

# Use Node.js LTS version as the base image
FROM node:lts-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the source code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port (default is 3000)
EXPOSE 3000

# Command to run the NestJS notification app
CMD ["npm", "run", "start:prod"]
