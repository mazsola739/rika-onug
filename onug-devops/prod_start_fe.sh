# kill frontend task
killport () {
  PID=$(sudo lsof -t -i:$1)
  sudo kill -9 ${PID}
}
killport 3000

cd ..
git fetch -u && git pull

cd onug-frontend

sudo yarn install
sudo yarn build

nohup sudo yarn start:prod > prod__nohup.txt &
sleep 3s 
cat prod__nohup.txt