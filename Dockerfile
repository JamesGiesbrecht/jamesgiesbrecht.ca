FROM node:14

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

ENV NODE_ENV=production

EXPOSE 3001

CMD ["yarn", "start"]
