# # --- Stage 1: Build the application ---
# FROM node:18-alpine AS builder
# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the source code
# COPY . .

# # Set the public API URL build argument
# ARG NEXT_PUBLIC_API_URL
# ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# # Build the Next.js application
# RUN npm run build

# # --- Stage 2: Create the production image ---
# FROM node:18-alpine AS runner

# WORKDIR /app

# # Copy only the necessary files from the builder stage
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# # Expose the port Next.js runs on
# EXPOSE 3000

# # Define the command to start the server
# CMD ["npm", "start"]


# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---

# Stage 2: Create the final, lightweight production image
FROM node:18-alpine

# Install netcat-openbsd, which provides the 'nc' command needed by our script.
RUN apk add --no-cache netcat-openbsd

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copy the wait script into the container
COPY ./wait-for-it.sh .
# Make the script executable
RUN chmod +x ./wait-for-it.sh

EXPOSE 3000

# Use the wait script. It will wait for 'backend:5000' to be ready,
# and then it will run 'npm start'.
CMD ["./wait-for-it.sh", "backend", "npm", "start"]
