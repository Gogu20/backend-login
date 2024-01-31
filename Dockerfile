FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 1550

CMD [ "npm", "run", "test-db" ]
