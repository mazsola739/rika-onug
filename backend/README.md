# Backend

## Dev notes

- only use simple js
- no extended libraries if not needed
- /src/server.js is the entrypoint for the express backend app, which is a wrapper to handle all the endpoints under aws

When you create a new endpoint, please update both the server.js

## env variables

- ONUG_REPOSITORY_TYPE
  - default: local
  - possible values: 's3', 'local', 'memory'
    will be only set in production (on AWS lambda), to use the aws-sdk s3 read / write methods instead of local fs read/write.
- ONUG_LOG_LEVEL
  - default: INFO
  - possible values 'ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'
    only use logError, logWarn, etc... methods instead of console log and set the log level on what level you would like to see in the console

## folder

### screen-play

for everything related to actually playing the game

### websocket

for everything related websocket connections
websocket-server.js is the entry point (websocket router)
connections.js manages connections per room and holds all the references of ws for users. Also handles broadcasting to all users (in a room)
all other files are actual 'endpoint', routed by message type

### validators

for everything related to validating players, cards, gamestates, etc...

### utils

other useful utility functions separated by domain (card, player, date-time, etc...)

### repository

for everything related to gamestate management, every gamestate update, delete, read should be called from this layer. Currently handling the gamestate altogether.

### log

logging utility, handles console logs and writing to log files (under backend/logs)

### god

admin rooter - for admin functionalities for rooms, ws connections, etc...

### gamestate

local json based database for gamestates

### data

init dataset for cards, rooms, etc...

### constants

### api

shrinking api router for REST endpoints (everything moving to ws instead)

## postman collections

- under /postman you can find the related postman collections, to trigger the backend with different pre-setup request bodies.
- please update them accordingly as well

## docker

- Dockerfile contains an alpine linux based setup, for be dockerization
- docker-compose.yml contains information about how to start the container, enlist services, which ports should be exposed etc...
  commands

create the image:

> docker build -t sylwolveryn/rika-onug .

check locally built / pulled images

> docker images

run locally built docker
preferred way: using docker-compose.yml

> docker-compose up

list docker containers

> docker ps

stop docker container

> docker stop CONTAINER_ID_FROM_PS

prune everything

> docker system prune -a

shell inside the running docker from commandline

> docker run --name rika-onug -p 80:7654 -d sylwolveryn/rika-onug sh

or use docker desktop

## aws

[Install aws cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

[get push command for onug](https://us-east-1.console.aws.amazon.com/ecr/repositories/private)
