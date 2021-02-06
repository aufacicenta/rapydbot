#! /usr/bin/bash

ROOT=`pwd`

cd order
sh install.sh
cd $ROOT

cd price
sh install.sh
cd $ROOT

cd user
sh install.sh
cd $ROOT

cd bot
yarn
yarn link @aufax/order
yarn link @aufax/user
