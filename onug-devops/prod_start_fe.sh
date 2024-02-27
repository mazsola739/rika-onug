# kill frontend task
killport () {
  PID=$(sudo lsof -t -i:$1)
  sudo kill -9 ${PID}
}
killport 3000

cd ..
git fetch -u && git pull

cd onug-frontend

yarn install
yarn build
cp -r assets/ dist/

nohup sudo yarn start:prod > prod__nohup.txt &

sleep 3s 
sudo lsof -i -P -n | grep LISTEN
cat prod__nohup.txt