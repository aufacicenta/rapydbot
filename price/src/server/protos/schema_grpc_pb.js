// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var schema_pb = require('./schema_pb.js');

function serialize_price_GetPriceReply(arg) {
  if (!(arg instanceof schema_pb.GetPriceReply)) {
    throw new Error('Expected argument of type price.GetPriceReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_price_GetPriceReply(buffer_arg) {
  return schema_pb.GetPriceReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_price_GetPriceRequest(arg) {
  if (!(arg instanceof schema_pb.GetPriceRequest)) {
    throw new Error('Expected argument of type price.GetPriceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_price_GetPriceRequest(buffer_arg) {
  return schema_pb.GetPriceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var PriceService = exports.PriceService = {
  getPrice: {
    path: '/price.Price/GetPrice',
    requestStream: false,
    responseStream: false,
    requestType: schema_pb.GetPriceRequest,
    responseType: schema_pb.GetPriceReply,
    requestSerialize: serialize_price_GetPriceRequest,
    requestDeserialize: deserialize_price_GetPriceRequest,
    responseSerialize: serialize_price_GetPriceReply,
    responseDeserialize: deserialize_price_GetPriceReply,
  },
};

exports.PriceClient = grpc.makeGenericClientConstructor(PriceService);
