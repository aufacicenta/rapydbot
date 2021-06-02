// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var schema_pb = require('./schema_pb.js');

function serialize_wallet_CreateWalletReply(arg) {
  if (!(arg instanceof schema_pb.CreateWalletReply)) {
    throw new Error('Expected argument of type wallet.CreateWalletReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_wallet_CreateWalletReply(buffer_arg) {
  return schema_pb.CreateWalletReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_wallet_CreateWalletRequest(arg) {
  if (!(arg instanceof schema_pb.CreateWalletRequest)) {
    throw new Error('Expected argument of type wallet.CreateWalletRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_wallet_CreateWalletRequest(buffer_arg) {
  return schema_pb.CreateWalletRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_wallet_TopUpWalletReply(arg) {
  if (!(arg instanceof schema_pb.TopUpWalletReply)) {
    throw new Error('Expected argument of type wallet.TopUpWalletReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_wallet_TopUpWalletReply(buffer_arg) {
  return schema_pb.TopUpWalletReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_wallet_TopUpWalletRequest(arg) {
  if (!(arg instanceof schema_pb.TopUpWalletRequest)) {
    throw new Error('Expected argument of type wallet.TopUpWalletRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_wallet_TopUpWalletRequest(buffer_arg) {
  return schema_pb.TopUpWalletRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var WalletService = exports.WalletService = {
  createWallet: {
    path: '/wallet.Wallet/CreateWallet',
    requestStream: false,
    responseStream: false,
    requestType: schema_pb.CreateWalletRequest,
    responseType: schema_pb.CreateWalletReply,
    requestSerialize: serialize_wallet_CreateWalletRequest,
    requestDeserialize: deserialize_wallet_CreateWalletRequest,
    responseSerialize: serialize_wallet_CreateWalletReply,
    responseDeserialize: deserialize_wallet_CreateWalletReply,
  },
  topUpWallet: {
    path: '/wallet.Wallet/TopUpWallet',
    requestStream: false,
    responseStream: false,
    requestType: schema_pb.TopUpWalletRequest,
    responseType: schema_pb.TopUpWalletReply,
    requestSerialize: serialize_wallet_TopUpWalletRequest,
    requestDeserialize: deserialize_wallet_TopUpWalletRequest,
    responseSerialize: serialize_wallet_TopUpWalletReply,
    responseDeserialize: deserialize_wallet_TopUpWalletReply,
  },
};

exports.WalletClient = grpc.makeGenericClientConstructor(WalletService);
