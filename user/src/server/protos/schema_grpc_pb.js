// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var schema_pb = require('./schema_pb.js');

function serialize_user_CreateUserReply(arg) {
  if (!(arg instanceof schema_pb.CreateUserReply)) {
    throw new Error('Expected argument of type user.CreateUserReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_CreateUserReply(buffer_arg) {
  return schema_pb.CreateUserReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_CreateUserRequest(arg) {
  if (!(arg instanceof schema_pb.CreateUserRequest)) {
    throw new Error('Expected argument of type user.CreateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_CreateUserRequest(buffer_arg) {
  return schema_pb.CreateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetUserReply(arg) {
  if (!(arg instanceof schema_pb.GetUserReply)) {
    throw new Error('Expected argument of type user.GetUserReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_GetUserReply(buffer_arg) {
  return schema_pb.GetUserReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetUserRequest(arg) {
  if (!(arg instanceof schema_pb.GetUserRequest)) {
    throw new Error('Expected argument of type user.GetUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_GetUserRequest(buffer_arg) {
  return schema_pb.GetUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserService = exports.UserService = {
  findUserByTelegramUserIdOrCreateUser: {
    path: '/user.User/FindUserByTelegramUserIdOrCreateUser',
    requestStream: false,
    responseStream: false,
    requestType: schema_pb.CreateUserRequest,
    responseType: schema_pb.CreateUserReply,
    requestSerialize: serialize_user_CreateUserRequest,
    requestDeserialize: deserialize_user_CreateUserRequest,
    responseSerialize: serialize_user_CreateUserReply,
    responseDeserialize: deserialize_user_CreateUserReply,
  },
  getUser: {
    path: '/user.User/GetUser',
    requestStream: false,
    responseStream: false,
    requestType: schema_pb.GetUserRequest,
    responseType: schema_pb.GetUserReply,
    requestSerialize: serialize_user_GetUserRequest,
    requestDeserialize: deserialize_user_GetUserRequest,
    responseSerialize: serialize_user_GetUserReply,
    responseDeserialize: deserialize_user_GetUserReply,
  },
};

exports.UserClient = grpc.makeGenericClientConstructor(UserService);
