FROM node:14 as build

WORKDIR /app/client

COPY /client/package.json .
COPY /client/yarn.lock .

RUN yarn install

COPY /client .

RUN yarn build

FROM node:14

WORKDIR /app/server

ENV NODE_ENV=production

COPY /server/package.json .
COPY /server/yarn.lock .

RUN yarn install

COPY /server .

COPY --from=build /app/client/build/ /app/client/build/

EXPOSE 3001

CMD ["node", "app.js"]
