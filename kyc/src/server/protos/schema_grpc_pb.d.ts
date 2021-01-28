// package: helloworld
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as schema_pb from "./schema_pb";

interface IGreeterService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sayHello: IGreeterService_ISayHello;
}

interface IGreeterService_ISayHello extends grpc.MethodDefinition<schema_pb.HelloRequest, schema_pb.HelloReply> {
    path: "/helloworld.Greeter/SayHello";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.HelloRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.HelloRequest>;
    responseSerialize: grpc.serialize<schema_pb.HelloReply>;
    responseDeserialize: grpc.deserialize<schema_pb.HelloReply>;
}

export const GreeterService: IGreeterService;

export interface IGreeterServer {
    sayHello: grpc.handleUnaryCall<schema_pb.HelloRequest, schema_pb.HelloReply>;
}

export interface IGreeterClient {
    sayHello(request: schema_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.HelloReply) => void): grpc.ClientUnaryCall;
    sayHello(request: schema_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.HelloReply) => void): grpc.ClientUnaryCall;
    sayHello(request: schema_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.HelloReply) => void): grpc.ClientUnaryCall;
}

export class GreeterClient extends grpc.Client implements IGreeterClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public sayHello(request: schema_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.HelloReply) => void): grpc.ClientUnaryCall;
    public sayHello(request: schema_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.HelloReply) => void): grpc.ClientUnaryCall;
    public sayHello(request: schema_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.HelloReply) => void): grpc.ClientUnaryCall;
}
