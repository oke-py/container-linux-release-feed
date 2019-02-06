FROM node:10

COPY --chown=node:users . /app
USER node
WORKDIR /app

RUN ["npm", "install", "--production"]
CMD ["node", "index.js"]
