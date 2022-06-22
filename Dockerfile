FROM node:16 AS base

WORKDIR /app

ARG FIREBASE_API_KEY
ARG FIREBASE_AUTH_DOMAIN
ARG FIREBASE_PROJECT_ID
ARG FIREBASE_SENDER_ID
ARG FIREBASE_APP_ID
ARG FIREBASE_MEASUREMENT_ID

ENV NEXT_PUBLIC_FIREBASE_API_KEY=$FIREBASE_API_KEY
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID
ENV NEXT_PUBLIC_FIREBASE_SENDER_ID=$FIREBASE_SENDER_ID
ENV NEXT_PUBLIC_FIREBASE_APP_ID=$FIREBASE_APP_ID
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=$FIREBASE_MEASUREMENT_ID

COPY package.json .
COPY yarn.lock .

RUN yarn install --production

COPY . .

RUN yarn build

EXPOSE 3001

FROM base AS dev
CMD ["yarn", "dev"]


FROM node:16 AS prod

WORKDIR /app

ENV NODE_ENV=production

COPY --from=base /app/.next/ /app/.next/
COPY --from=base /app/public/ /app/public/
COPY --from=base /app/dist/ /app/dist/
COPY --from=base /app/node_modules/ /app/node_modules

COPY package.json .
COPY yarn.lock .
RUN yarn install --production

CMD ["node", "dist/server/index.js"]
