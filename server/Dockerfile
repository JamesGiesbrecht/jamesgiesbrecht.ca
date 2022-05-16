FROM node:14

RUN apk --no-cache add bash g++ gcc libgcc make python chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /app/server

COPY server/package.json .
COPY server/yarn.lock .

RUN yarn install

COPY @types/ /app/@types/
COPY server/. .
COPY client/build/ /app/client/build/

EXPOSE 3001

CMD [ "yarn", "dev" ]
