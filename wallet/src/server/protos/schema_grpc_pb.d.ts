// package: wallet
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as schema_pb from "./schema_pb";

interface IWalletService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createWallet: IWalletService_ICreateWallet;
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

export const WalletService: IWalletService;

export interface IWalletServer {
    createWallet: grpc.handleUnaryCall<schema_pb.CreateWalletRequest, schema_pb.CreateWalletReply>;
}

export interface IWalletClient {
    createWallet(request: schema_pb.CreateWalletRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateWalletReply) => void): grpc.ClientUnaryCall;
    createWallet(request: schema_pb.CreateWalletRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateWalletReply) => void): grpc.ClientUnaryCall;
    createWallet(request: schema_pb.CreateWalletRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateWalletReply) => void): grpc.ClientUnaryCall;
}

export class WalletClient extends grpc.Client implements IWalletClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createWallet(request: schema_pb.CreateWalletRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateWalletReply) => void): grpc.ClientUnaryCall;
    public createWallet(request: schema_pb.CreateWalletRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateWalletReply) => void): grpc.ClientUnaryCall;
    public createWallet(request: schema_pb.CreateWalletRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateWalletReply) => void): grpc.ClientUnaryCall;
}
