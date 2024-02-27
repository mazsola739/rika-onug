# to re-init ubuntu server as ec2

## default update upgrade
sudo apt-get update
sudo apt-get upgrade

## not necessary, but if we want to be auth to aws, it might be useful
aws configure
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install -y unzip    
unzip awscliv2.zip
sudo ./aws/install

## install node version 20.x 
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install --global yarn
sudo npm install --global nodemon


# GIT
# need the private key to be copied to the right place (/home/ubuntu/.ssh/) or generate a new one with
# ssh-keygen -t ed25519 -C "sylwolveryn@gmail.com"

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
git clone git@github.com:mazsola739/rika-onug.git


## open up ports
sudo iptables -A INPUT -p tcp --dport 7654 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 7655 -j ACCEPT
# for FE
sudo iptables -A INPUT -p tcp --dport 3000 -j ACCEPT

## start backend
cd /rika-onug/onug-backend
yarn
nohup yarn start &

## start frontend
cd /rika-onug/onug-frontend
nohup yarn start --host

## kill service
ps
kill -9 NODE_ID