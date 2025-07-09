FROM node:18-alpine3.20

WORKDIR /app

EXPOSE 5000
EXPOSE 1337 
EXPOSE 5555

CMD ["sh", "-c", "npm install ; npm run migrate:dev ; npm run start:dev"]
