// package: user
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as schema_pb from "./schema_pb";

interface IUserService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    findUserByTelegramUserIdOrCreateUser: IUserService_IFindUserByTelegramUserIdOrCreateUser;
    getUser: IUserService_IGetUser;
    getUsers: IUserService_IGetUsers;
    findUserByTelegramUserId: IUserService_IFindUserByTelegramUserId;
}

interface IUserService_IFindUserByTelegramUserIdOrCreateUser extends grpc.MethodDefinition<schema_pb.CreateUserRequest, schema_pb.CreateUserReply> {
    path: "/user.User/FindUserByTelegramUserIdOrCreateUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.CreateUserRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.CreateUserRequest>;
    responseSerialize: grpc.serialize<schema_pb.CreateUserReply>;
    responseDeserialize: grpc.deserialize<schema_pb.CreateUserReply>;
}
interface IUserService_IGetUser extends grpc.MethodDefinition<schema_pb.GetUserRequest, schema_pb.GetUserReply> {
    path: "/user.User/GetUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.GetUserRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.GetUserRequest>;
    responseSerialize: grpc.serialize<schema_pb.GetUserReply>;
    responseDeserialize: grpc.deserialize<schema_pb.GetUserReply>;
}
interface IUserService_IGetUsers extends grpc.MethodDefinition<schema_pb.GetUsersRequest, schema_pb.GetUserReply> {
    path: "/user.User/GetUsers";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<schema_pb.GetUsersRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.GetUsersRequest>;
    responseSerialize: grpc.serialize<schema_pb.GetUserReply>;
    responseDeserialize: grpc.deserialize<schema_pb.GetUserReply>;
}
interface IUserService_IFindUserByTelegramUserId extends grpc.MethodDefinition<schema_pb.FindUserByTelegramUserIdRequest, schema_pb.FindUserByTelegramUserIdReply> {
    path: "/user.User/FindUserByTelegramUserId";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.FindUserByTelegramUserIdRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.FindUserByTelegramUserIdRequest>;
    responseSerialize: grpc.serialize<schema_pb.FindUserByTelegramUserIdReply>;
    responseDeserialize: grpc.deserialize<schema_pb.FindUserByTelegramUserIdReply>;
}

export const UserService: IUserService;

export interface IUserServer {
    findUserByTelegramUserIdOrCreateUser: grpc.handleUnaryCall<schema_pb.CreateUserRequest, schema_pb.CreateUserReply>;
    getUser: grpc.handleUnaryCall<schema_pb.GetUserRequest, schema_pb.GetUserReply>;
    getUsers: grpc.handleServerStreamingCall<schema_pb.GetUsersRequest, schema_pb.GetUserReply>;
    findUserByTelegramUserId: grpc.handleUnaryCall<schema_pb.FindUserByTelegramUserIdRequest, schema_pb.FindUserByTelegramUserIdReply>;
}

export interface IUserClient {
    findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    getUser(request: schema_pb.GetUserRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.GetUserReply) => void): grpc.ClientUnaryCall;
    getUser(request: schema_pb.GetUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.GetUserReply) => void): grpc.ClientUnaryCall;
    getUser(request: schema_pb.GetUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.GetUserReply) => void): grpc.ClientUnaryCall;
    getUsers(request: schema_pb.GetUsersRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<schema_pb.GetUserReply>;
    getUsers(request: schema_pb.GetUsersRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<schema_pb.GetUserReply>;
    findUserByTelegramUserId(request: schema_pb.FindUserByTelegramUserIdRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.FindUserByTelegramUserIdReply) => void): grpc.ClientUnaryCall;
    findUserByTelegramUserId(request: schema_pb.FindUserByTelegramUserIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.FindUserByTelegramUserIdReply) => void): grpc.ClientUnaryCall;
    findUserByTelegramUserId(request: schema_pb.FindUserByTelegramUserIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.FindUserByTelegramUserIdReply) => void): grpc.ClientUnaryCall;
}

export class UserClient extends grpc.Client implements IUserClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    public findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    public findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    public getUser(request: schema_pb.GetUserRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.GetUserReply) => void): grpc.ClientUnaryCall;
    public getUser(request: schema_pb.GetUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.GetUserReply) => void): grpc.ClientUnaryCall;
    public getUser(request: schema_pb.GetUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.GetUserReply) => void): grpc.ClientUnaryCall;
    public getUsers(request: schema_pb.GetUsersRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<schema_pb.GetUserReply>;
    public getUsers(request: schema_pb.GetUsersRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<schema_pb.GetUserReply>;
    public findUserByTelegramUserId(request: schema_pb.FindUserByTelegramUserIdRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.FindUserByTelegramUserIdReply) => void): grpc.ClientUnaryCall;
    public findUserByTelegramUserId(request: schema_pb.FindUserByTelegramUserIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.FindUserByTelegramUserIdReply) => void): grpc.ClientUnaryCall;
    public findUserByTelegramUserId(request: schema_pb.FindUserByTelegramUserIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.FindUserByTelegramUserIdReply) => void): grpc.ClientUnaryCall;
}
