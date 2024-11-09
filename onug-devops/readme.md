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
> ../onug-devops//killFe.sh

kill be 
> ../onug-devops/killBe.sh

re-start be
```
cd onug-backend
../onug-devops/killBe.sh
yarn
rm prod__nohup.txt
nohup yarn start:ec2 > prod__nohup.txt </dev/null 2>&1 &
cat prod__nohup.txt
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



re-start fe
```
cd onug-frontend
../onug-devops/killFe.sh
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

