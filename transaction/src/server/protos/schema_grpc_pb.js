// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var schema_pb = require('./schema_pb.js');

function serialize_transaction_GetTransactionBreakdownReply(arg) {
  if (!(arg instanceof schema_pb.GetTransactionBreakdownReply)) {
    throw new Error('Expected argument of type transaction.GetTransactionBreakdownReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_transaction_GetTransactionBreakdownReply(buffer_arg) {
  return schema_pb.GetTransactionBreakdownReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_transaction_GetTransactionBreakdownRequest(arg) {
  if (!(arg instanceof schema_pb.GetTransactionBreakdownRequest)) {
    throw new Error('Expected argument of type transaction.GetTransactionBreakdownRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_transaction_GetTransactionBreakdownRequest(buffer_arg) {
  return schema_pb.GetTransactionBreakdownRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var TransactionService = exports.TransactionService = {
  getTransactionBreakdown: {
    path: '/transaction.Transaction/GetTransactionBreakdown',
    requestStream: false,
    responseStream: false,
    requestType: schema_pb.GetTransactionBreakdownRequest,
    responseType: schema_pb.GetTransactionBreakdownReply,
    requestSerialize: serialize_transaction_GetTransactionBreakdownRequest,
    requestDeserialize: deserialize_transaction_GetTransactionBreakdownRequest,
    responseSerialize: serialize_transaction_GetTransactionBreakdownReply,
    responseDeserialize: deserialize_transaction_GetTransactionBreakdownReply,
  },
};

exports.TransactionClient = grpc.makeGenericClientConstructor(TransactionService);
