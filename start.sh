#! /bin/bash

sleep $(($RANDOM % (4 * 3600)))
rm /home/baki/development/auto_swipe/screenshot/*
/usr/local/n/versions/node/17.9.1/bin/node /home/baki/development/auto_swipe/build/index.js &> /tmp/tinder_auto_swipe_msg.txt