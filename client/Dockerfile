FROM node:14

WORKDIR /app/client

COPY client/package.json .
COPY client/yarn.lock .

RUN yarn install

COPY @types/ /app/@types/
COPY client/. .

EXPOSE 3000

CMD [ "yarn", "start" ]
