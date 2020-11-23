FROM node:latest

WORKDIR /usr/src/app

COPY . . 

RUN npm install

EXPOSE 8080

CMD ["node", "server.js"]

# to build for production
# RUN npm ci --only=production
