FROM node:16.16.0

WORKDIR /usr/src/app

COPY ../front/package.json ./

RUN npm install

COPY ../front ./

CMD ["npm", "run", "start"]