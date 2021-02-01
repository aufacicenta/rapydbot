// package: user
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as schema_pb from "./schema_pb";

interface IUserService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createUser: IUserService_ICreateUser;
    findUserByTelegramUserIdOrCreateUser: IUserService_IFindUserByTelegramUserIdOrCreateUser;
    resolveUserIDFromTelegramUserID: IUserService_IResolveUserIDFromTelegramUserID;
}

interface IUserService_ICreateUser extends grpc.MethodDefinition<schema_pb.CreateUserRequest, schema_pb.CreateUserReply> {
    path: "/user.User/CreateUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.CreateUserRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.CreateUserRequest>;
    responseSerialize: grpc.serialize<schema_pb.CreateUserReply>;
    responseDeserialize: grpc.deserialize<schema_pb.CreateUserReply>;
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
interface IUserService_IResolveUserIDFromTelegramUserID extends grpc.MethodDefinition<schema_pb.ResolveUserIDFromTelegramUserIDRequest, schema_pb.ResolveUserIDFromTelegramUserIDReply> {
    path: "/user.User/ResolveUserIDFromTelegramUserID";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.ResolveUserIDFromTelegramUserIDRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.ResolveUserIDFromTelegramUserIDRequest>;
    responseSerialize: grpc.serialize<schema_pb.ResolveUserIDFromTelegramUserIDReply>;
    responseDeserialize: grpc.deserialize<schema_pb.ResolveUserIDFromTelegramUserIDReply>;
}

export const UserService: IUserService;

export interface IUserServer {
    createUser: grpc.handleUnaryCall<schema_pb.CreateUserRequest, schema_pb.CreateUserReply>;
    findUserByTelegramUserIdOrCreateUser: grpc.handleUnaryCall<schema_pb.CreateUserRequest, schema_pb.CreateUserReply>;
    resolveUserIDFromTelegramUserID: grpc.handleUnaryCall<schema_pb.ResolveUserIDFromTelegramUserIDRequest, schema_pb.ResolveUserIDFromTelegramUserIDReply>;
}

export interface IUserClient {
    createUser(request: schema_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    createUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    createUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    resolveUserIDFromTelegramUserID(request: schema_pb.ResolveUserIDFromTelegramUserIDRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.ResolveUserIDFromTelegramUserIDReply) => void): grpc.ClientUnaryCall;
    resolveUserIDFromTelegramUserID(request: schema_pb.ResolveUserIDFromTelegramUserIDRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.ResolveUserIDFromTelegramUserIDReply) => void): grpc.ClientUnaryCall;
    resolveUserIDFromTelegramUserID(request: schema_pb.ResolveUserIDFromTelegramUserIDRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.ResolveUserIDFromTelegramUserIDReply) => void): grpc.ClientUnaryCall;
}

export class UserClient extends grpc.Client implements IUserClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createUser(request: schema_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    public createUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    public createUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    public findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    public findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    public findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    public resolveUserIDFromTelegramUserID(request: schema_pb.ResolveUserIDFromTelegramUserIDRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.ResolveUserIDFromTelegramUserIDReply) => void): grpc.ClientUnaryCall;
    public resolveUserIDFromTelegramUserID(request: schema_pb.ResolveUserIDFromTelegramUserIDRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.ResolveUserIDFromTelegramUserIDReply) => void): grpc.ClientUnaryCall;
    public resolveUserIDFromTelegramUserID(request: schema_pb.ResolveUserIDFromTelegramUserIDRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.ResolveUserIDFromTelegramUserIDReply) => void): grpc.ClientUnaryCall;
}
