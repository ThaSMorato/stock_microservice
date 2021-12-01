FROM node:14

WORKDIR /usr/app

COPY package.json ./

RUN npm install


COPY . .

EXPOSE 50051

CMD ["npm", "run", "dev"]