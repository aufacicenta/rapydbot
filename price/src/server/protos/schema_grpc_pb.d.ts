// package: price
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as schema_pb from "./schema_pb";

interface IPriceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getPrice: IPriceService_IGetPrice;
}

interface IPriceService_IGetPrice extends grpc.MethodDefinition<schema_pb.GetPriceRequest, schema_pb.GetPriceReply> {
    path: "/price.Price/GetPrice";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.GetPriceRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.GetPriceRequest>;
    responseSerialize: grpc.serialize<schema_pb.GetPriceReply>;
    responseDeserialize: grpc.deserialize<schema_pb.GetPriceReply>;
}

export const PriceService: IPriceService;

export interface IPriceServer {
    getPrice: grpc.handleUnaryCall<schema_pb.GetPriceRequest, schema_pb.GetPriceReply>;
}

export interface IPriceClient {
    getPrice(request: schema_pb.GetPriceRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.GetPriceReply) => void): grpc.ClientUnaryCall;
    getPrice(request: schema_pb.GetPriceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.GetPriceReply) => void): grpc.ClientUnaryCall;
    getPrice(request: schema_pb.GetPriceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.GetPriceReply) => void): grpc.ClientUnaryCall;
}

export class PriceClient extends grpc.Client implements IPriceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getPrice(request: schema_pb.GetPriceRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.GetPriceReply) => void): grpc.ClientUnaryCall;
    public getPrice(request: schema_pb.GetPriceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.GetPriceReply) => void): grpc.ClientUnaryCall;
    public getPrice(request: schema_pb.GetPriceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.GetPriceReply) => void): grpc.ClientUnaryCall;
}
