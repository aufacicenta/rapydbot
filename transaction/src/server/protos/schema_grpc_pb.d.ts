// package: transaction
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as schema_pb from "./schema_pb";

interface ITransactionService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getTransactionBreakdown: ITransactionService_IGetTransactionBreakdown;
}

interface ITransactionService_IGetTransactionBreakdown extends grpc.MethodDefinition<schema_pb.GetTransactionBreakdownRequest, schema_pb.GetTransactionBreakdownReply> {
    path: "/transaction.Transaction/GetTransactionBreakdown";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.GetTransactionBreakdownRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.GetTransactionBreakdownRequest>;
    responseSerialize: grpc.serialize<schema_pb.GetTransactionBreakdownReply>;
    responseDeserialize: grpc.deserialize<schema_pb.GetTransactionBreakdownReply>;
}

export const TransactionService: ITransactionService;

export interface ITransactionServer {
    getTransactionBreakdown: grpc.handleUnaryCall<schema_pb.GetTransactionBreakdownRequest, schema_pb.GetTransactionBreakdownReply>;
}

export interface ITransactionClient {
    getTransactionBreakdown(request: schema_pb.GetTransactionBreakdownRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.GetTransactionBreakdownReply) => void): grpc.ClientUnaryCall;
    getTransactionBreakdown(request: schema_pb.GetTransactionBreakdownRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.GetTransactionBreakdownReply) => void): grpc.ClientUnaryCall;
    getTransactionBreakdown(request: schema_pb.GetTransactionBreakdownRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.GetTransactionBreakdownReply) => void): grpc.ClientUnaryCall;
}

export class TransactionClient extends grpc.Client implements ITransactionClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getTransactionBreakdown(request: schema_pb.GetTransactionBreakdownRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.GetTransactionBreakdownReply) => void): grpc.ClientUnaryCall;
    public getTransactionBreakdown(request: schema_pb.GetTransactionBreakdownRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.GetTransactionBreakdownReply) => void): grpc.ClientUnaryCall;
    public getTransactionBreakdown(request: schema_pb.GetTransactionBreakdownRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.GetTransactionBreakdownReply) => void): grpc.ClientUnaryCall;
}
