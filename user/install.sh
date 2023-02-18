#! /usr/bin/bash

ROOT=`pwd`
PROTO_DEST=$ROOT/src/server/protos

echo $PROTO_DEST

source .env

yarn

echo "Compiling proto files"
sh compile-proto.sh

yarn publish:prepare

cp package.json build
mkdir build/server
cp -R $PROTO_DEST build/server

cd $ROOT/build
yarn link