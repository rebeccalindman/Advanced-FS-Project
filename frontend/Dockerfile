# frontend/Dockerfile
FROM node:18-bullseye-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5174

CMD ["npm", "run", "dev"]