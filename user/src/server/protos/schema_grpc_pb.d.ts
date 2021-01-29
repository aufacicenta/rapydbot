// package: user
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as schema_pb from "./schema_pb";

interface IUSERService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createUser: IUSERService_ICreateUser;
    findUserByTelegramUserIdOrCreateUser: IUSERService_IFindUserByTelegramUserIdOrCreateUser;
    resolveUserIDFromTelegramUserID: IUSERService_IResolveUserIDFromTelegramUserID;
}

interface IUSERService_ICreateUser extends grpc.MethodDefinition<schema_pb.CreateUserRequest, schema_pb.CreateUserReply> {
    path: "/user.USER/CreateUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.CreateUserRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.CreateUserRequest>;
    responseSerialize: grpc.serialize<schema_pb.CreateUserReply>;
    responseDeserialize: grpc.deserialize<schema_pb.CreateUserReply>;
}
interface IUSERService_IFindUserByTelegramUserIdOrCreateUser extends grpc.MethodDefinition<schema_pb.CreateUserRequest, schema_pb.CreateUserReply> {
    path: "/user.USER/FindUserByTelegramUserIdOrCreateUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.CreateUserRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.CreateUserRequest>;
    responseSerialize: grpc.serialize<schema_pb.CreateUserReply>;
    responseDeserialize: grpc.deserialize<schema_pb.CreateUserReply>;
}
interface IUSERService_IResolveUserIDFromTelegramUserID extends grpc.MethodDefinition<schema_pb.ResolveUserIDFromTelegramUserIDRequest, schema_pb.ResolveUserIDFromTelegramUserIDReply> {
    path: "/user.USER/ResolveUserIDFromTelegramUserID";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.ResolveUserIDFromTelegramUserIDRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.ResolveUserIDFromTelegramUserIDRequest>;
    responseSerialize: grpc.serialize<schema_pb.ResolveUserIDFromTelegramUserIDReply>;
    responseDeserialize: grpc.deserialize<schema_pb.ResolveUserIDFromTelegramUserIDReply>;
}

export const USERService: IUSERService;

export interface IUSERServer {
    createUser: grpc.handleUnaryCall<schema_pb.CreateUserRequest, schema_pb.CreateUserReply>;
    findUserByTelegramUserIdOrCreateUser: grpc.handleUnaryCall<schema_pb.CreateUserRequest, schema_pb.CreateUserReply>;
    resolveUserIDFromTelegramUserID: grpc.handleUnaryCall<schema_pb.ResolveUserIDFromTelegramUserIDRequest, schema_pb.ResolveUserIDFromTelegramUserIDReply>;
}

export interface IUSERClient {
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

export class USERClient extends grpc.Client implements IUSERClient {
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
