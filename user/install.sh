#! /usr/bin/bash

ROOT=`pwd`
PROTO_DEST=$ROOT/src/server/protos

echo $PROTO_DEST

source .env
. .env

yarn

yarn run grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:${PROTO_DEST} \
    --grpc_out=${PROTO_DEST} \
    --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
    -I ${PROTO_DEST} ${PROTO_DEST}/*.proto

# TypeScript code generation
yarn run grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=${PROTO_DEST} \
    -I ${PROTO_DEST} ${PROTO_DEST}/*.proto

yarn publish:prepare

cp package.json build
mkdir build/server
cp -R $PROTO_DEST build/server

cd $ROOT/build
yarn link