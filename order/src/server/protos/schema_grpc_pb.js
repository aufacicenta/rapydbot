// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var schema_pb = require('./schema_pb.js');

function serialize_order_CreateOrderReply(arg) {
  if (!(arg instanceof schema_pb.CreateOrderReply)) {
    throw new Error('Expected argument of type order.CreateOrderReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_order_CreateOrderReply(buffer_arg) {
  return schema_pb.CreateOrderReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_order_CreateOrderRequest(arg) {
  if (!(arg instanceof schema_pb.CreateOrderRequest)) {
    throw new Error('Expected argument of type order.CreateOrderRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_order_CreateOrderRequest(buffer_arg) {
  return schema_pb.CreateOrderRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_order_GetSellOrdersReply(arg) {
  if (!(arg instanceof schema_pb.GetSellOrdersReply)) {
    throw new Error('Expected argument of type order.GetSellOrdersReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_order_GetSellOrdersReply(buffer_arg) {
  return schema_pb.GetSellOrdersReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_order_GetSellOrdersRequest(arg) {
  if (!(arg instanceof schema_pb.GetSellOrdersRequest)) {
    throw new Error('Expected argument of type order.GetSellOrdersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_order_GetSellOrdersRequest(buffer_arg) {
  return schema_pb.GetSellOrdersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var OrderService = exports.OrderService = {
  createSellOrder: {
    path: '/order.Order/CreateSellOrder',
    requestStream: false,
    responseStream: false,
    requestType: schema_pb.CreateOrderRequest,
    responseType: schema_pb.CreateOrderReply,
    requestSerialize: serialize_order_CreateOrderRequest,
    requestDeserialize: deserialize_order_CreateOrderRequest,
    responseSerialize: serialize_order_CreateOrderReply,
    responseDeserialize: deserialize_order_CreateOrderReply,
  },
  createBuyOrder: {
    path: '/order.Order/CreateBuyOrder',
    requestStream: false,
    responseStream: false,
    requestType: schema_pb.CreateOrderRequest,
    responseType: schema_pb.CreateOrderReply,
    requestSerialize: serialize_order_CreateOrderRequest,
    requestDeserialize: deserialize_order_CreateOrderRequest,
    responseSerialize: serialize_order_CreateOrderReply,
    responseDeserialize: deserialize_order_CreateOrderReply,
  },
  getSellOrders: {
    path: '/order.Order/GetSellOrders',
    requestStream: false,
    responseStream: true,
    requestType: schema_pb.GetSellOrdersRequest,
    responseType: schema_pb.GetSellOrdersReply,
    requestSerialize: serialize_order_GetSellOrdersRequest,
    requestDeserialize: deserialize_order_GetSellOrdersRequest,
    responseSerialize: serialize_order_GetSellOrdersReply,
    responseDeserialize: deserialize_order_GetSellOrdersReply,
  },
};

exports.OrderClient = grpc.makeGenericClientConstructor(OrderService);
