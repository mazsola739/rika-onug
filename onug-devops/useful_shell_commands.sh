
# kill a task based on the port it's currently using.
killport () {
  PID=$(sudo lsof -t -i:$1)
  sudo kill -9 ${PID}
}
# example usage
killport 3000


# get all tasks that listen on ports. 
sudo lsof -i -P -n | grep LISTEN