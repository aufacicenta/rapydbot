// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var schema_pb = require('./schema_pb.js');

function serialize_transaction_CreateOrderReply(arg) {
  if (!(arg instanceof schema_pb.CreateOrderReply)) {
    throw new Error('Expected argument of type transaction.CreateOrderReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_transaction_CreateOrderReply(buffer_arg) {
  return schema_pb.CreateOrderReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_transaction_CreateOrderRequest(arg) {
  if (!(arg instanceof schema_pb.CreateOrderRequest)) {
    throw new Error('Expected argument of type transaction.CreateOrderRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_transaction_CreateOrderRequest(buffer_arg) {
  return schema_pb.CreateOrderRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_transaction_GetSellOrdersReply(arg) {
  if (!(arg instanceof schema_pb.GetSellOrdersReply)) {
    throw new Error('Expected argument of type transaction.GetSellOrdersReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_transaction_GetSellOrdersReply(buffer_arg) {
  return schema_pb.GetSellOrdersReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_transaction_GetSellOrdersRequest(arg) {
  if (!(arg instanceof schema_pb.GetSellOrdersRequest)) {
    throw new Error('Expected argument of type transaction.GetSellOrdersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_transaction_GetSellOrdersRequest(buffer_arg) {
  return schema_pb.GetSellOrdersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var TransactionService = exports.TransactionService = {
  createSellOrder: {
    path: '/transaction.Transaction/CreateSellOrder',
    requestStream: false,
    responseStream: false,
    requestType: schema_pb.CreateOrderRequest,
    responseType: schema_pb.CreateOrderReply,
    requestSerialize: serialize_transaction_CreateOrderRequest,
    requestDeserialize: deserialize_transaction_CreateOrderRequest,
    responseSerialize: serialize_transaction_CreateOrderReply,
    responseDeserialize: deserialize_transaction_CreateOrderReply,
  },
  createBuyOrder: {
    path: '/transaction.Transaction/CreateBuyOrder',
    requestStream: false,
    responseStream: false,
    requestType: schema_pb.CreateOrderRequest,
    responseType: schema_pb.CreateOrderReply,
    requestSerialize: serialize_transaction_CreateOrderRequest,
    requestDeserialize: deserialize_transaction_CreateOrderRequest,
    responseSerialize: serialize_transaction_CreateOrderReply,
    responseDeserialize: deserialize_transaction_CreateOrderReply,
  },
  getSellOrders: {
    path: '/transaction.Transaction/GetSellOrders',
    requestStream: false,
    responseStream: true,
    requestType: schema_pb.GetSellOrdersRequest,
    responseType: schema_pb.GetSellOrdersReply,
    requestSerialize: serialize_transaction_GetSellOrdersRequest,
    requestDeserialize: deserialize_transaction_GetSellOrdersRequest,
    responseSerialize: serialize_transaction_GetSellOrdersReply,
    responseDeserialize: deserialize_transaction_GetSellOrdersReply,
  },
};

exports.TransactionClient = grpc.makeGenericClientConstructor(TransactionService);
