FROM node:20.16.0-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN chmod +x ./node_modules/.bin/react-scripts
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:latest
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80