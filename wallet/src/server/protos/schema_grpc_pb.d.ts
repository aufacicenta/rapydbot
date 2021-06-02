// package: wallet
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as schema_pb from "./schema_pb";

interface IWalletService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createWallet: IWalletService_ICreateWallet;
    topUpWallet: IWalletService_ITopUpWallet;
    transferFromWallet: IWalletService_ITransferFromWallet;
    setTransferFromWalletResponse: IWalletService_ISetTransferFromWalletResponse;
}

interface IWalletService_ICreateWallet extends grpc.MethodDefinition<schema_pb.CreateWalletRequest, schema_pb.CreateWalletReply> {
    path: "/wallet.Wallet/CreateWallet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.CreateWalletRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.CreateWalletRequest>;
    responseSerialize: grpc.serialize<schema_pb.CreateWalletReply>;
    responseDeserialize: grpc.deserialize<schema_pb.CreateWalletReply>;
}
interface IWalletService_ITopUpWallet extends grpc.MethodDefinition<schema_pb.TopUpWalletRequest, schema_pb.TopUpWalletReply> {
    path: "/wallet.Wallet/TopUpWallet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.TopUpWalletRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.TopUpWalletRequest>;
    responseSerialize: grpc.serialize<schema_pb.TopUpWalletReply>;
    responseDeserialize: grpc.deserialize<schema_pb.TopUpWalletReply>;
}
interface IWalletService_ITransferFromWallet extends grpc.MethodDefinition<schema_pb.TransferFromWalletRequest, schema_pb.TransferFromWalletReply> {
    path: "/wallet.Wallet/TransferFromWallet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.TransferFromWalletRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.TransferFromWalletRequest>;
    responseSerialize: grpc.serialize<schema_pb.TransferFromWalletReply>;
    responseDeserialize: grpc.deserialize<schema_pb.TransferFromWalletReply>;
}
interface IWalletService_ISetTransferFromWalletResponse extends grpc.MethodDefinition<schema_pb.SetTransferFromWalletResponseRequest, schema_pb.SetTransferFromWalletResponseReply> {
    path: "/wallet.Wallet/SetTransferFromWalletResponse";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.SetTransferFromWalletResponseRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.SetTransferFromWalletResponseRequest>;
    responseSerialize: grpc.serialize<schema_pb.SetTransferFromWalletResponseReply>;
    responseDeserialize: grpc.deserialize<schema_pb.SetTransferFromWalletResponseReply>;
}

export const WalletService: IWalletService;

export interface IWalletServer {
    createWallet: grpc.handleUnaryCall<schema_pb.CreateWalletRequest, schema_pb.CreateWalletReply>;
    topUpWallet: grpc.handleUnaryCall<schema_pb.TopUpWalletRequest, schema_pb.TopUpWalletReply>;
    transferFromWallet: grpc.handleUnaryCall<schema_pb.TransferFromWalletRequest, schema_pb.TransferFromWalletReply>;
    setTransferFromWalletResponse: grpc.handleUnaryCall<schema_pb.SetTransferFromWalletResponseRequest, schema_pb.SetTransferFromWalletResponseReply>;
}

export interface IWalletClient {
    createWallet(request: schema_pb.CreateWalletRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateWalletReply) => void): grpc.ClientUnaryCall;
    createWallet(request: schema_pb.CreateWalletRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateWalletReply) => void): grpc.ClientUnaryCall;
    createWallet(request: schema_pb.CreateWalletRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateWalletReply) => void): grpc.ClientUnaryCall;
    topUpWallet(request: schema_pb.TopUpWalletRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.TopUpWalletReply) => void): grpc.ClientUnaryCall;
    topUpWallet(request: schema_pb.TopUpWalletRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.TopUpWalletReply) => void): grpc.ClientUnaryCall;
    topUpWallet(request: schema_pb.TopUpWalletRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.TopUpWalletReply) => void): grpc.ClientUnaryCall;
    transferFromWallet(request: schema_pb.TransferFromWalletRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.TransferFromWalletReply) => void): grpc.ClientUnaryCall;
    transferFromWallet(request: schema_pb.TransferFromWalletRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.TransferFromWalletReply) => void): grpc.ClientUnaryCall;
    transferFromWallet(request: schema_pb.TransferFromWalletRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.TransferFromWalletReply) => void): grpc.ClientUnaryCall;
    setTransferFromWalletResponse(request: schema_pb.SetTransferFromWalletResponseRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.SetTransferFromWalletResponseReply) => void): grpc.ClientUnaryCall;
    setTransferFromWalletResponse(request: schema_pb.SetTransferFromWalletResponseRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.SetTransferFromWalletResponseReply) => void): grpc.ClientUnaryCall;
    setTransferFromWalletResponse(request: schema_pb.SetTransferFromWalletResponseRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.SetTransferFromWalletResponseReply) => void): grpc.ClientUnaryCall;
}

export class WalletClient extends grpc.Client implements IWalletClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createWallet(request: schema_pb.CreateWalletRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateWalletReply) => void): grpc.ClientUnaryCall;
    public createWallet(request: schema_pb.CreateWalletRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateWalletReply) => void): grpc.ClientUnaryCall;
    public createWallet(request: schema_pb.CreateWalletRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateWalletReply) => void): grpc.ClientUnaryCall;
    public topUpWallet(request: schema_pb.TopUpWalletRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.TopUpWalletReply) => void): grpc.ClientUnaryCall;
    public topUpWallet(request: schema_pb.TopUpWalletRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.TopUpWalletReply) => void): grpc.ClientUnaryCall;
    public topUpWallet(request: schema_pb.TopUpWalletRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.TopUpWalletReply) => void): grpc.ClientUnaryCall;
    public transferFromWallet(request: schema_pb.TransferFromWalletRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.TransferFromWalletReply) => void): grpc.ClientUnaryCall;
    public transferFromWallet(request: schema_pb.TransferFromWalletRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.TransferFromWalletReply) => void): grpc.ClientUnaryCall;
    public transferFromWallet(request: schema_pb.TransferFromWalletRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.TransferFromWalletReply) => void): grpc.ClientUnaryCall;
    public setTransferFromWalletResponse(request: schema_pb.SetTransferFromWalletResponseRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.SetTransferFromWalletResponseReply) => void): grpc.ClientUnaryCall;
    public setTransferFromWalletResponse(request: schema_pb.SetTransferFromWalletResponseRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.SetTransferFromWalletResponseReply) => void): grpc.ClientUnaryCall;
    public setTransferFromWalletResponse(request: schema_pb.SetTransferFromWalletResponseRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.SetTransferFromWalletResponseReply) => void): grpc.ClientUnaryCall;
}
