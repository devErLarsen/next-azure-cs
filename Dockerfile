FROM node:14

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm set unsafe-perm true

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]