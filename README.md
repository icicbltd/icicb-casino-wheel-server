
This is casino wheel game server for casino game platform.

Installation:
1) Installing globally and run as service with pm2:

[sudo] npm install pm2 -g
[sudo] npm install casino-server -g

# run redis-server first
redis-server &
# run as service and cluster mode
pm2 start npm -- name wheel -- run server

2) Installing as a node app, and run in current folder:
git clone https://github.com/galaxy-digital/icicb-casino-wheel-server.git 
cd casino
npm install
# sudo npm install -g gulp
# gulp build
node bin/casino-server [options]


This is casino wheel game unity.
The game is very interesting and fair.

