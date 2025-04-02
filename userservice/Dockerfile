# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the project files
COPY . .

# Expose the API Gateway port
EXPOSE 4000

# Start the API Gateway
CMD ["node", "src/server.js"]
