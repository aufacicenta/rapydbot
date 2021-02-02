// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var schema_pb = require('./schema_pb.js');

function serialize_transaction_CreateTransactionReply(arg) {
  if (!(arg instanceof schema_pb.CreateTransactionReply)) {
    throw new Error('Expected argument of type transaction.CreateTransactionReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_transaction_CreateTransactionReply(buffer_arg) {
  return schema_pb.CreateTransactionReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_transaction_CreateTransactionRequest(arg) {
  if (!(arg instanceof schema_pb.CreateTransactionRequest)) {
    throw new Error('Expected argument of type transaction.CreateTransactionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_transaction_CreateTransactionRequest(buffer_arg) {
  return schema_pb.CreateTransactionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var TransactionService = exports.TransactionService = {
  createTransaction: {
    path: '/transaction.Transaction/CreateTransaction',
    requestStream: false,
    responseStream: false,
    requestType: schema_pb.CreateTransactionRequest,
    responseType: schema_pb.CreateTransactionReply,
    requestSerialize: serialize_transaction_CreateTransactionRequest,
    requestDeserialize: deserialize_transaction_CreateTransactionRequest,
    responseSerialize: serialize_transaction_CreateTransactionReply,
    responseDeserialize: deserialize_transaction_CreateTransactionReply,
  },
};

exports.TransactionClient = grpc.makeGenericClientConstructor(TransactionService);
