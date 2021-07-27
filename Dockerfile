FROM node:16-slim AS build
WORKDIR /usr/lib/braze
COPY package*.json ./
RUN npm install
RUN npm install -g typescript
COPY . .
RUN tsc

FROM node:16-slim
WORKDIR /braze/app
COPY package*.json ./
COPY braze.meta.json ./
RUN npm ci --only=production
COPY --from=build /usr/lib/braze/dist ./dist

EXPOSE 8000

CMD [ "node", "dist/app.js" ]
