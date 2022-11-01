FROM node:16.16.0

WORKDIR /usr/src/app

COPY ../front-web/package.json ./

RUN npm install

COPY ../front-web ./

CMD ["npm", "run", "start"]