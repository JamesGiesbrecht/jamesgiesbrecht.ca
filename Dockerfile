FROM node:14

WORKDIR /app/client

COPY /client/package.json .
COPY /client/package-lock.json .

RUN npm install

COPY /client .

RUN npm run build

WORKDIR /app/server

COPY /server/package.json .
COPY /server/package-lock.json .

RUN npm install

COPY /server .

EXPOSE 3001

CMD ["node", "app.js"]
