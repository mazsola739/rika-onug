FROM node:20.11.1-alpine3.19


RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --chown=node . .

RUN yarn global add nodemon
RUN yarn install

USER node

EXPOSE 7654

CMD [ "yarn", "start" ]
