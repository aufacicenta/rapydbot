// package: transaction
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as schema_pb from "./schema_pb";

interface ITransactionService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createTransaction: ITransactionService_ICreateTransaction;
}

interface ITransactionService_ICreateTransaction extends grpc.MethodDefinition<schema_pb.CreateTransactionRequest, schema_pb.CreateTransactionReply> {
    path: "/transaction.Transaction/CreateTransaction";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.CreateTransactionRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.CreateTransactionRequest>;
    responseSerialize: grpc.serialize<schema_pb.CreateTransactionReply>;
    responseDeserialize: grpc.deserialize<schema_pb.CreateTransactionReply>;
}

export const TransactionService: ITransactionService;

export interface ITransactionServer {
    createTransaction: grpc.handleUnaryCall<schema_pb.CreateTransactionRequest, schema_pb.CreateTransactionReply>;
}

export interface ITransactionClient {
    createTransaction(request: schema_pb.CreateTransactionRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateTransactionReply) => void): grpc.ClientUnaryCall;
    createTransaction(request: schema_pb.CreateTransactionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateTransactionReply) => void): grpc.ClientUnaryCall;
    createTransaction(request: schema_pb.CreateTransactionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateTransactionReply) => void): grpc.ClientUnaryCall;
}

export class TransactionClient extends grpc.Client implements ITransactionClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createTransaction(request: schema_pb.CreateTransactionRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateTransactionReply) => void): grpc.ClientUnaryCall;
    public createTransaction(request: schema_pb.CreateTransactionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateTransactionReply) => void): grpc.ClientUnaryCall;
    public createTransaction(request: schema_pb.CreateTransactionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateTransactionReply) => void): grpc.ClientUnaryCall;
}
