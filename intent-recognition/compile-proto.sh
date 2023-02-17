#! /usr/bin/bash

ROOT=`pwd`

IN_DIR=$ROOT/src/server/protos
OUT_DIR=$IN_DIR
TS_OUT_DIR=$OUT_DIR
PROTOC="$(npm bin)/grpc_tools_node_protoc"
PROTOC_GEN_TS_PATH="$(npm bin)/protoc-gen-ts"
PROTOC_GEN_GRPC_PATH="$(npm bin)/grpc_tools_node_protoc_plugin"

$PROTOC \
    -I="$IN_DIR" \
    --plugin=protoc-gen-ts=$PROTOC_GEN_TS_PATH \
    --plugin=protoc-gen-grpc=${PROTOC_GEN_GRPC_PATH} \
    --js_out=import_style=commonjs:$OUT_DIR \
    --grpc_out=grpc_js:$OUT_DIR \
    --ts_out=grpc_js:$TS_OUT_DIR \
    "$IN_DIR"/*.proto