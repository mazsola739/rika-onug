check folder sizes only show size each folder:
> du -h -d 1

delete cache
>cd ~

> rm -rf .cache/


the app lives inside app/rika-onug
> cd app/rika-onug

add executable permission to sh script
>chmod +x

or if sudo needed:
>sudo chmod +x

for instance
```
chmod +x killFe.sh
chmod +x killBe.sh

./killFe.sh
./killBe.sh
```

manual restart
go into app
> cd app/rika-onug 
check running state of the fe and be
> sudo lsof -i -P -n | grep LISTEN
 
kill fe
> ../devops//killFe.sh

kill be 
> ../devops/killBe.sh

re-start be
```
cd backend
../devops/killBe.sh
yarn
rm prod__nohup.txt
nohup yarn run start > prod__nohup.txt </dev/null 2>src/prod__crash.js &
cat prod__nohup.txt
cat src/prod__crash.js

```
to see be console logs
> cat prod__nohup.txt &

to check running state of app 
> sudo lsof -i -P -n | grep LISTEN

if something like this is shown in the terminal:
```
node      416846          ubuntu   31u  IPv6 4881063      0t0  TCP *:7655 (LISTEN)
node      416846          ubuntu   32u  IPv6 4881064      0t0  TCP *:7654 (LISTEN)
```
backend is running


check running node instances
```
ps aux | grep node
```

kill node based on instanceId
```
sudo kill -9 INSTANCE_ID_FROM_PREVIOUS_PS_AUX_COMMAND
```


re-start fe
```
cd frontend
../devops/killFe.sh
yarn
yarn build:prod
rm prod__nohup.txt
nohup yarn start:prod > prod__nohup.txt </dev/null 2>&1 &
cat prod__nohup.txt
sudo lsof -i -P -n | grep LISTEN
```

to see fe console logs
> cat prod__nohup.txt &

to check running state of app
> sudo lsof -i -P -n | grep LISTEN
if something like this is shown in the terminal:
```
node      415825            root   20u  IPv6 4848920      0t0  TCP *:3000 (LISTEN)
```
frontend is running


## nohup and nodemon important knowledge
https://stackoverflow.com/questions/4018154/how-do-i-run-a-node-js-app-as-a-background-service

- 2>&1 is usually used, to append error logs in to the same log file, but we want to differenciate it from the normal logs. Creating a js file inside src for backend, to trigger nodemon restart functionality.
- -x tsx is used in yarn start to make sure that the imports can be used instead of requirejs.
- viteconfig is needed to make sure that the backend app is not throwing errors on startup, because it would trigger nodemon restart as well, in an infinite loop. Make sure to check that the app DOES NOT logs error on startup, to avoid this case in the future.
BE start script is:
```
nohup yarn run start > prod__nohup.txt </dev/null 2>src/prod__crash.js &
where nohup is no hangup
yarn run start is the command to run the start script from pacakge json
> prod__nohup.txt is the normal logs for the BE service
2>src/prod__crash.js is the error logs
 & gives back the terminal, and does not stuck inside the running script
```

# GUI Extension for Database Management

For easier management of your DynamoDB database, you can use the `dynamodb-admin` GUI extension. Follow these steps to set it up:

1. Install `dynamodb-admin` globally:
   ```
   npm install -g dynamodb-admin
   ```

2. Set the required environment variables:
   ```
   export AWS_ACCESS_KEY_ID=your-access-key-id
   export AWS_SECRET_ACCESS_KEY=your-secret-access-key
   export AWS_REGION=your-region
   export DYNAMO_ENDPOINT=http://localhost:8000
   ```

3. Start the `dynamodb-admin` GUI:
   ```
   dynamodb-admin
   ```

4. Access the GUI in your browser at:
   ```
   http://localhost:8001
   ```