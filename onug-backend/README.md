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
for everything related to database management, every database update, delete, read should be called from this layer. Currently handling the gamestate altogether.

### log
logging utility, handles console logs and writing to log files (under onug-backend/logs)

### god
admin rooter - for admin functionalities for rooms, ws connections, etc...

### database
local json based database for gamestates

### data
init dataset for cards, rooms, etc...

### constants

### api
shrinking api router for REST endpoints (everything moving to ws instead)


## postman collections
- under /postman you can find the related postman collections, to trigger the backend with different pre-setup request bodies.
- please update them accordingly as well
