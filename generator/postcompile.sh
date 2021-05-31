#! /usr/bin/bash

ROOT=`pwd`

cp package.json build

mkdir -p build/template
cp -R template/. build/template

cd build
npm pack