FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY client/package.json ./client/
COPY shared/package.json ./shared/

RUN npm install

COPY client/ ./client/
COPY shared/ ./shared/

WORKDIR /app/client

CMD ["npm", "run", "dev"]