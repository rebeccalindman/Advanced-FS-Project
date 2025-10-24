# Backend/Dockerfile
######

FROM node:22-bullseye-slim

WORKDIR /app

# Copy only package.json & package-lock.json first
COPY package*.json ./

# Install all dependencies inside container
RUN npm install

# Copy source code
COPY . .

EXPOSE 3000

# Run nodemon
CMD ["npm", "run", "dev"]


