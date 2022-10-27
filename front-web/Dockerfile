FROM node:16.16.0

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

COPY --from=build /usr/src/app/build /var/jenkins_home/workspace/front-docs/front-web