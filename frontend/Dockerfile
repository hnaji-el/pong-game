FROM node:18.14.0-buster

USER node
WORKDIR /home/node/frontend

COPY --chown=node:node . ./

COPY ./start.sh ./

RUN npm install --prefix ./

EXPOSE 3000

CMD ["bash", "+x", "./start.sh"]
