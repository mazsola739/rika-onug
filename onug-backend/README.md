# Backend

## Dev notes
- only use simple js
- no extended libraries if not needed
- everything under lambda folder will be deployed to AWS lambda
- /src/server.js is the entrypoint for the express backend app, which is a wrapper to handle all the endpoints under aws
- /src/lambda/router/index.js is the entrypoint for the AWS lambda, it handles the routing for all the 'endpoints' / which are actually routes defined as fields in the POST request

When you create a new endpoint, please update both the server.js and the routes/index.js as well to make it work on both aws lambda and local express wrapper ways.

## env variables
- REPOSITORY_TYPE => s3 vs local
if not set, default is local 
will be only set in production (on AWS lambda), to use the aws-sdk s3 read / write methods instead of local fs read/write. 

## 

## postman collections
- under /postman you can find the related postman collections, to trigger the backend with different pre-setup request bodies.
- please update them accordingly as well
