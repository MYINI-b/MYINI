FROM node:16.16.0

WORKDIR /usr/src/app

RUN npm install
RUN npm install node-sass
RUN npm install sass-loader sass webpack --save-dev
RUN npm install -D postcss-flexbugs-fixes
RUN npm install -D postcss-preset-env
RUN npm install --save-dev postcss-loader postcss

COPY ./ ./

CMD ["npm", "run", "start"]