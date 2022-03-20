FROM node:16 AS base

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3001

FROM base AS dev
CMD ["yarn", "dev"]

FROM node:16 AS prod
WORKDIR /app
COPY --from=base /app/.next/ /app/.next/
COPY --from=base /app/public/ /app/public/
COPY --from=base /app/dist/ /app/dist/
CMD ["node", "dist/server/index.js"]
