# FROM node:10.15.3

# WORKDIR /app

# COPY . /app

# RUN npm i yarn -g && yarn

# EXPOSE 3003

# CMD ["yarn", "start-test"]


FROM node:12.18.3 AS builder

WORKDIR /code
ADD . /code

RUN npm config set -g production false
RUN npm install
RUN npm install nestjs/core

ENV NODE_ENV production
RUN npm run build

FROM node:12.18.3-alpine
COPY --from=builder /code/dist .
COPY static ./static
COPY views ./views
USER 1000
EXPOSE 8000
ENV NODE_ENV production
CMD ["node", "main.js"]
