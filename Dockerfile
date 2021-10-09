FROM node:14 as build

WORKDIR /app/client

COPY client/package.json .
COPY client/yarn.lock .

RUN yarn install

COPY @types/ /app/@types/
COPY client/. .

RUN yarn build

FROM node:14

WORKDIR /app/server

COPY server/package.json .
COPY server/yarn.lock .

RUN yarn install

COPY @types/ /app/@types/
COPY server/ .

RUN yarn build

COPY --from=build /app/client/build/ /app/client/build/

ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "dist/server/src/index.js"]
