FROM node:16-slim AS build
WORKDIR /metal
COPY package*.json ./
RUN npm install
RUN npm install -g typescript
COPY . .
RUN tsc

FROM node:16-slim
WORKDIR /metal/app
COPY package*.json ./
COPY metal.meta.json ./
RUN npm ci --only=production
COPY --from=build /metal/dist ./dist

EXPOSE 8000

CMD [ "node", "dist/app.js" ]
