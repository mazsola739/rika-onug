# Backend

## Dev notes
- only use simple js
- no extended libraries if not needed
- /src/server.js is the entrypoint for the express backend app, which is a wrapper to handle all the endpoints under aws

When you create a new endpoint, please update both the server.js

## env variables
- REPOSITORY_TYPE
  - default: local
  - possible values: 's3', 'local'
will be only set in production (on AWS lambda), to use the aws-sdk s3 read / write methods instead of local fs read/write. 
- ONUG_LOG_LEVEL
  - default: INFO
  - possible values 'ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'
  only use logError, logWarn, etc... methods instead of console log and set the log level on what level you would like to see in the console
## 

## postman collections
- under /postman you can find the related postman collections, to trigger the backend with different pre-setup request bodies.
- please update them accordingly as well
