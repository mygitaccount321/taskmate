FROM node:20.16.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@latest
RUN npm install
COPY . .
RUN chmod +x ./node_modules/.bin/react-scripts
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
