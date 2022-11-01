FROM node:16.16.0

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "start"]