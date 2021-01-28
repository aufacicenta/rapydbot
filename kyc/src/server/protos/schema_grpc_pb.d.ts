// package: kyc
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as schema_pb from "./schema_pb";

interface IKYCService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    processPassportData: IKYCService_IProcessPassportData;
}

interface IKYCService_IProcessPassportData extends grpc.MethodDefinition<schema_pb.ProcessPassportDataRequest, schema_pb.ProcessPassportDataReply> {
    path: "/kyc.KYC/ProcessPassportData";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.ProcessPassportDataRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.ProcessPassportDataRequest>;
    responseSerialize: grpc.serialize<schema_pb.ProcessPassportDataReply>;
    responseDeserialize: grpc.deserialize<schema_pb.ProcessPassportDataReply>;
}

export const KYCService: IKYCService;

export interface IKYCServer {
    processPassportData: grpc.handleUnaryCall<schema_pb.ProcessPassportDataRequest, schema_pb.ProcessPassportDataReply>;
}

export interface IKYCClient {
    processPassportData(request: schema_pb.ProcessPassportDataRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.ProcessPassportDataReply) => void): grpc.ClientUnaryCall;
    processPassportData(request: schema_pb.ProcessPassportDataRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.ProcessPassportDataReply) => void): grpc.ClientUnaryCall;
    processPassportData(request: schema_pb.ProcessPassportDataRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.ProcessPassportDataReply) => void): grpc.ClientUnaryCall;
}

export class KYCClient extends grpc.Client implements IKYCClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public processPassportData(request: schema_pb.ProcessPassportDataRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.ProcessPassportDataReply) => void): grpc.ClientUnaryCall;
    public processPassportData(request: schema_pb.ProcessPassportDataRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.ProcessPassportDataReply) => void): grpc.ClientUnaryCall;
    public processPassportData(request: schema_pb.ProcessPassportDataRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.ProcessPassportDataReply) => void): grpc.ClientUnaryCall;
}
