FROM node:lts-alpine

WORKDIR /shopping-api

COPY package.json .

RUN npm install

COPY . .

CMD npm start