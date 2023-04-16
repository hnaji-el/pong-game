FROM node:18.14.0-buster

USER node
WORKDIR /home/node/backend

COPY --chown=node:node . ./

COPY  ./start.sh ./

RUN npm install --prefix ./

EXPOSE 5000
EXPOSE 5555

CMD ["bash", "+x", "./start.sh"]
