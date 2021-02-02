// package: transaction
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as schema_pb from "./schema_pb";

interface ITransactionService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createTransaction: ITransactionService_ICreateTransaction;
    getSellOrders: ITransactionService_IGetSellOrders;
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
interface ITransactionService_IGetSellOrders extends grpc.MethodDefinition<schema_pb.GetSellOrdersRequest, schema_pb.GetSellOrdersReply> {
    path: "/transaction.Transaction/GetSellOrders";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<schema_pb.GetSellOrdersRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.GetSellOrdersRequest>;
    responseSerialize: grpc.serialize<schema_pb.GetSellOrdersReply>;
    responseDeserialize: grpc.deserialize<schema_pb.GetSellOrdersReply>;
}

export const TransactionService: ITransactionService;

export interface ITransactionServer {
    createTransaction: grpc.handleUnaryCall<schema_pb.CreateTransactionRequest, schema_pb.CreateTransactionReply>;
    getSellOrders: grpc.handleServerStreamingCall<schema_pb.GetSellOrdersRequest, schema_pb.GetSellOrdersReply>;
}

export interface ITransactionClient {
    createTransaction(request: schema_pb.CreateTransactionRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateTransactionReply) => void): grpc.ClientUnaryCall;
    createTransaction(request: schema_pb.CreateTransactionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateTransactionReply) => void): grpc.ClientUnaryCall;
    createTransaction(request: schema_pb.CreateTransactionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateTransactionReply) => void): grpc.ClientUnaryCall;
    getSellOrders(request: schema_pb.GetSellOrdersRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<schema_pb.GetSellOrdersReply>;
    getSellOrders(request: schema_pb.GetSellOrdersRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<schema_pb.GetSellOrdersReply>;
}

export class TransactionClient extends grpc.Client implements ITransactionClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createTransaction(request: schema_pb.CreateTransactionRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateTransactionReply) => void): grpc.ClientUnaryCall;
    public createTransaction(request: schema_pb.CreateTransactionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateTransactionReply) => void): grpc.ClientUnaryCall;
    public createTransaction(request: schema_pb.CreateTransactionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateTransactionReply) => void): grpc.ClientUnaryCall;
    public getSellOrders(request: schema_pb.GetSellOrdersRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<schema_pb.GetSellOrdersReply>;
    public getSellOrders(request: schema_pb.GetSellOrdersRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<schema_pb.GetSellOrdersReply>;
}
