FROM node:14

WORKDIR /app/client

COPY /client/package.json .
COPY /client/yarn.lock .

RUN yarn install

COPY /client .

RUN yarn build

RUN rm -r node_modules public src

WORKDIR /app/server

ENV NODE_ENV=production

COPY /server/package.json .
COPY /server/yarn.lock .

RUN yarn install

COPY /server .

EXPOSE 3001

CMD ["node", "app.js"]
