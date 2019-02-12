FROM node:10

COPY --chown=node:node . /app
USER node
WORKDIR /app

RUN ["npm", "install", "--production"]
CMD ["node", "index.js"]
