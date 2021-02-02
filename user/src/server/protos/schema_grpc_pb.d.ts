// package: user
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as schema_pb from "./schema_pb";

interface IUserService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    findUserByTelegramUserIdOrCreateUser: IUserService_IFindUserByTelegramUserIdOrCreateUser;
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

export const UserService: IUserService;

export interface IUserServer {
    findUserByTelegramUserIdOrCreateUser: grpc.handleUnaryCall<schema_pb.CreateUserRequest, schema_pb.CreateUserReply>;
}

export interface IUserClient {
    findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
}

export class UserClient extends grpc.Client implements IUserClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    public findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
    public findUserByTelegramUserIdOrCreateUser(request: schema_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateUserReply) => void): grpc.ClientUnaryCall;
}
