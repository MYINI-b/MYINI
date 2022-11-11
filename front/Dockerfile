FROM node:16.16.0

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm cache clean --force
RUN rm -rf node_modules package-lock.json

RUN npm install --save
RUN npm install node-sass
RUN npm install sass-loader sass webpack --save-dev
RUN npm install -D postcss-flexbugs-fixes
RUN npm install -D postcss-preset-env
RUN npm install --save-dev postcss-loader postcss

COPY ./ ./

CMD ["npm", "run", "start"]
