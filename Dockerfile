FROM node:12.18.3 AS builder
RUN npm install -g yarn --force 

WORKDIR /code
ADD . /code

RUN yarn
RUN yarn build

FROM node:12.18.3-alpine
COPY --from=builder /code/dist ./dist
COPY --from=builder /code/node_modules ./node_modules
COPY static ./static
COPY views ./views

EXPOSE 8000
ENV NODE_ENV production
CMD ["node", "/dist/main.js"]
