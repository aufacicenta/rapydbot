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

function serialize_user_FindUserByTelegramUserIdReply(arg) {
  if (!(arg instanceof schema_pb.FindUserByTelegramUserIdReply)) {
    throw new Error('Expected argument of type user.FindUserByTelegramUserIdReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_FindUserByTelegramUserIdReply(buffer_arg) {
  return schema_pb.FindUserByTelegramUserIdReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_FindUserByTelegramUserIdRequest(arg) {
  if (!(arg instanceof schema_pb.FindUserByTelegramUserIdRequest)) {
    throw new Error('Expected argument of type user.FindUserByTelegramUserIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_FindUserByTelegramUserIdRequest(buffer_arg) {
  return schema_pb.FindUserByTelegramUserIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_user_GetUsersRequest(arg) {
  if (!(arg instanceof schema_pb.GetUsersRequest)) {
    throw new Error('Expected argument of type user.GetUsersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_GetUsersRequest(buffer_arg) {
  return schema_pb.GetUsersRequest.deserializeBinary(new Uint8Array(buffer_arg));
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
  getUsers: {
    path: '/user.User/GetUsers',
    requestStream: false,
    responseStream: true,
    requestType: schema_pb.GetUsersRequest,
    responseType: schema_pb.GetUserReply,
    requestSerialize: serialize_user_GetUsersRequest,
    requestDeserialize: deserialize_user_GetUsersRequest,
    responseSerialize: serialize_user_GetUserReply,
    responseDeserialize: deserialize_user_GetUserReply,
  },
  findUserByTelegramUserId: {
    path: '/user.User/FindUserByTelegramUserId',
    requestStream: false,
    responseStream: false,
    requestType: schema_pb.FindUserByTelegramUserIdRequest,
    responseType: schema_pb.FindUserByTelegramUserIdReply,
    requestSerialize: serialize_user_FindUserByTelegramUserIdRequest,
    requestDeserialize: deserialize_user_FindUserByTelegramUserIdRequest,
    responseSerialize: serialize_user_FindUserByTelegramUserIdReply,
    responseDeserialize: deserialize_user_FindUserByTelegramUserIdReply,
  },
};

exports.UserClient = grpc.makeGenericClientConstructor(UserService);
