// package: user
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as schema_pb from "./schema_pb";

interface IUserService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    findUserByTelegramUserIdOrCreateUser: IUserService_IFindUserByTelegramUserIdOrCreateUser;
    getUser: IUserService_IGetUser;
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

export const UserService: IUserService;

export interface IUserServer {
    findUserByTelegramUserIdOrCreateUser: grpc.handleUnaryCall<schema_pb.CreateUserRequest, schema_pb.CreateUserReply>;
    getUser: grpc.handleUnaryCall<schema_pb.GetUserRequest, schema_pb.GetUserReply>;
}

export interface IUserClient {
    findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    getUser(request: schema_pb.GetUserRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.GetUserReply) => void): grpc.ClientUnaryCall;
    getUser(request: schema_pb.GetUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.GetUserReply) => void): grpc.ClientUnaryCall;
    getUser(request: schema_pb.GetUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.GetUserReply) => void): grpc.ClientUnaryCall;
}

export class UserClient extends grpc.Client implements IUserClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    public findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    public findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    public getUser(request: schema_pb.GetUserRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.GetUserReply) => void): grpc.ClientUnaryCall;
    public getUser(request: schema_pb.GetUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.GetUserReply) => void): grpc.ClientUnaryCall;
    public getUser(request: schema_pb.GetUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.GetUserReply) => void): grpc.ClientUnaryCall;
}
