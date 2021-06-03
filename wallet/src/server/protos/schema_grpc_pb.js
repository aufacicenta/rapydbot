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

function serialize_wallet_SetTransferFromWalletResponseReply(arg) {
  if (!(arg instanceof schema_pb.SetTransferFromWalletResponseReply)) {
    throw new Error('Expected argument of type wallet.SetTransferFromWalletResponseReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_wallet_SetTransferFromWalletResponseReply(buffer_arg) {
  return schema_pb.SetTransferFromWalletResponseReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_wallet_SetTransferFromWalletResponseRequest(arg) {
  if (!(arg instanceof schema_pb.SetTransferFromWalletResponseRequest)) {
    throw new Error('Expected argument of type wallet.SetTransferFromWalletResponseRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_wallet_SetTransferFromWalletResponseRequest(buffer_arg) {
  return schema_pb.SetTransferFromWalletResponseRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_wallet_TransferFromWalletReply(arg) {
  if (!(arg instanceof schema_pb.TransferFromWalletReply)) {
    throw new Error('Expected argument of type wallet.TransferFromWalletReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_wallet_TransferFromWalletReply(buffer_arg) {
  return schema_pb.TransferFromWalletReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_wallet_TransferFromWalletRequest(arg) {
  if (!(arg instanceof schema_pb.TransferFromWalletRequest)) {
    throw new Error('Expected argument of type wallet.TransferFromWalletRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_wallet_TransferFromWalletRequest(buffer_arg) {
  return schema_pb.TransferFromWalletRequest.deserializeBinary(new Uint8Array(buffer_arg));
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
  transferFromWallet: {
    path: '/wallet.Wallet/TransferFromWallet',
    requestStream: false,
    responseStream: false,
    requestType: schema_pb.TransferFromWalletRequest,
    responseType: schema_pb.TransferFromWalletReply,
    requestSerialize: serialize_wallet_TransferFromWalletRequest,
    requestDeserialize: deserialize_wallet_TransferFromWalletRequest,
    responseSerialize: serialize_wallet_TransferFromWalletReply,
    responseDeserialize: deserialize_wallet_TransferFromWalletReply,
  },
  setTransferFromWalletResponse: {
    path: '/wallet.Wallet/SetTransferFromWalletResponse',
    requestStream: false,
    responseStream: false,
    requestType: schema_pb.SetTransferFromWalletResponseRequest,
    responseType: schema_pb.SetTransferFromWalletResponseReply,
    requestSerialize: serialize_wallet_SetTransferFromWalletResponseRequest,
    requestDeserialize: deserialize_wallet_SetTransferFromWalletResponseRequest,
    responseSerialize: serialize_wallet_SetTransferFromWalletResponseReply,
    responseDeserialize: deserialize_wallet_SetTransferFromWalletResponseReply,
  },
};

exports.WalletClient = grpc.makeGenericClientConstructor(WalletService);
