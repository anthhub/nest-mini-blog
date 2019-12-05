FROM node:10.15.3

WORKDIR /app

COPY . /app

RUN npm i yarn -g && yarn

EXPOSE 3003

CMD ["yarn", "start"]

