FROM node:18-buster

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000
EXPOSE 1337 
EXPOSE 5555

CMD ["sh", "-c", "npm run migrate:dev ; npm run start:dev"]