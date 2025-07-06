# Stage 1: Use the official Node.js 18 Alpine image for a small footprint
FROM node:18-alpine AS base

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of application code
COPY . .

# Expose the port the app runs on
EXPOSE 5001

# Define the command to run app
CMD ["node", "index.js"]
