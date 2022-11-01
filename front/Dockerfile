FROM node:16.16.0

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install
RUN npm install node-sass
RUN npm install sass-loader sass webpack --save-dev
RUN npm install postcss

COPY ./ ./

CMD ["npm", "run", "start"]