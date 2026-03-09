FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY server/package.json ./server/
COPY shared/package.json ./shared/

RUN npm install

COPY server/ ./server/
COPY shared/ ./shared/

RUN chmod +x /app/server/start.sh

WORKDIR /app/server

CMD ["sh", "/app/server/start.sh"]