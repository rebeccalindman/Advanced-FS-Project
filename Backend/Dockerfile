# Backend/Dockerfile
######

FROM node:20-alpine
WORKDIR /app

# Install dependencies
COPY package*.json tsconfig.json ./
RUN npm install

# Copy source code
COPY . .

# Expose backend port
EXPOSE 3000

# Start the backend
CMD ["npm", "run", "dev"]  # or "start" if you compile to JS
