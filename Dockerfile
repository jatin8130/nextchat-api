FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g pm2

EXPOSE 8080

CMD ["pm2-runtime", "dist/index.js"]