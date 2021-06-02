// package: wallet
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as schema_pb from "./schema_pb";

interface IWalletService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createWallet: IWalletService_ICreateWallet;
    topUpWallet: IWalletService_ITopUpWallet;
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

export const WalletService: IWalletService;

export interface IWalletServer {
    createWallet: grpc.handleUnaryCall<schema_pb.CreateWalletRequest, schema_pb.CreateWalletReply>;
    topUpWallet: grpc.handleUnaryCall<schema_pb.TopUpWalletRequest, schema_pb.TopUpWalletReply>;
}

export interface IWalletClient {
    createWallet(request: schema_pb.CreateWalletRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateWalletReply) => void): grpc.ClientUnaryCall;
    createWallet(request: schema_pb.CreateWalletRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateWalletReply) => void): grpc.ClientUnaryCall;
    createWallet(request: schema_pb.CreateWalletRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateWalletReply) => void): grpc.ClientUnaryCall;
    topUpWallet(request: schema_pb.TopUpWalletRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.TopUpWalletReply) => void): grpc.ClientUnaryCall;
    topUpWallet(request: schema_pb.TopUpWalletRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.TopUpWalletReply) => void): grpc.ClientUnaryCall;
    topUpWallet(request: schema_pb.TopUpWalletRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.TopUpWalletReply) => void): grpc.ClientUnaryCall;
}

export class WalletClient extends grpc.Client implements IWalletClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createWallet(request: schema_pb.CreateWalletRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateWalletReply) => void): grpc.ClientUnaryCall;
    public createWallet(request: schema_pb.CreateWalletRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateWalletReply) => void): grpc.ClientUnaryCall;
    public createWallet(request: schema_pb.CreateWalletRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateWalletReply) => void): grpc.ClientUnaryCall;
    public topUpWallet(request: schema_pb.TopUpWalletRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.TopUpWalletReply) => void): grpc.ClientUnaryCall;
    public topUpWallet(request: schema_pb.TopUpWalletRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.TopUpWalletReply) => void): grpc.ClientUnaryCall;
    public topUpWallet(request: schema_pb.TopUpWalletRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.TopUpWalletReply) => void): grpc.ClientUnaryCall;
}
