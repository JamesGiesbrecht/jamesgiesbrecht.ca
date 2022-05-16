FROM node:14 as build

WORKDIR /app/client

ARG REACT_APP_FIREBASE_API_KEY
ARG REACT_APP_AUTH_DOMAIN
ARG REACT_APP_FIREBASE_PROJECT_ID
ARG REACT_APP_FIREBASE_SENDER_ID
ARG REACT_APP_FIREBASE_APP_ID
ARG REACT_APP_FIREBASE_MEASUREMENT_ID

COPY client/package.json .
COPY client/yarn.lock .

RUN yarn install

COPY @types/ /app/@types/
COPY client/. .

COPY generate-env.sh .
RUN sh generate-env.sh REACT_APP_FIREBASE_API_KEY=${REACT_APP_FIREBASE_API_KEY} REACT_APP_AUTH_DOMAIN=${REACT_APP_AUTH_DOMAIN} REACT_APP_FIREBASE_PROJECT_ID=${REACT_APP_FIREBASE_PROJECT_ID} REACT_APP_FIREBASE_SENDER_ID=${REACT_APP_FIREBASE_SENDER_ID} REACT_APP_FIREBASE_APP_ID=${REACT_APP_FIREBASE_APP_ID} REACT_APP_FIREBASE_MEASUREMENT_ID=${REACT_APP_FIREBASE_MEASUREMENT_ID}

RUN yarn build

FROM node:14

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

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
