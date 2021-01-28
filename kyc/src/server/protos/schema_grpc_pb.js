// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var schema_pb = require('./schema_pb.js');

function serialize_kyc_ProcessPassportDataReply(arg) {
  if (!(arg instanceof schema_pb.ProcessPassportDataReply)) {
    throw new Error('Expected argument of type kyc.ProcessPassportDataReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_kyc_ProcessPassportDataReply(buffer_arg) {
  return schema_pb.ProcessPassportDataReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_kyc_ProcessPassportDataRequest(arg) {
  if (!(arg instanceof schema_pb.ProcessPassportDataRequest)) {
    throw new Error('Expected argument of type kyc.ProcessPassportDataRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_kyc_ProcessPassportDataRequest(buffer_arg) {
  return schema_pb.ProcessPassportDataRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var KYCService = exports.KYCService = {
  processPassportData: {
    path: '/kyc.KYC/ProcessPassportData',
    requestStream: false,
    responseStream: false,
    requestType: schema_pb.ProcessPassportDataRequest,
    responseType: schema_pb.ProcessPassportDataReply,
    requestSerialize: serialize_kyc_ProcessPassportDataRequest,
    requestDeserialize: deserialize_kyc_ProcessPassportDataRequest,
    responseSerialize: serialize_kyc_ProcessPassportDataReply,
    responseDeserialize: deserialize_kyc_ProcessPassportDataReply,
  },
};

exports.KYCClient = grpc.makeGenericClientConstructor(KYCService);
