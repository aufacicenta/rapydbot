// package: order
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as schema_pb from "./schema_pb";

interface IOrderService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createSellOrder: IOrderService_ICreateSellOrder;
    createBuyOrder: IOrderService_ICreateBuyOrder;
    getSellOrders: IOrderService_IGetSellOrders;
}

interface IOrderService_ICreateSellOrder extends grpc.MethodDefinition<schema_pb.CreateOrderRequest, schema_pb.CreateOrderReply> {
    path: "/order.Order/CreateSellOrder";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.CreateOrderRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.CreateOrderRequest>;
    responseSerialize: grpc.serialize<schema_pb.CreateOrderReply>;
    responseDeserialize: grpc.deserialize<schema_pb.CreateOrderReply>;
}
interface IOrderService_ICreateBuyOrder extends grpc.MethodDefinition<schema_pb.CreateOrderRequest, schema_pb.CreateOrderReply> {
    path: "/order.Order/CreateBuyOrder";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<schema_pb.CreateOrderRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.CreateOrderRequest>;
    responseSerialize: grpc.serialize<schema_pb.CreateOrderReply>;
    responseDeserialize: grpc.deserialize<schema_pb.CreateOrderReply>;
}
interface IOrderService_IGetSellOrders extends grpc.MethodDefinition<schema_pb.GetSellOrdersRequest, schema_pb.GetSellOrdersReply> {
    path: "/order.Order/GetSellOrders";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<schema_pb.GetSellOrdersRequest>;
    requestDeserialize: grpc.deserialize<schema_pb.GetSellOrdersRequest>;
    responseSerialize: grpc.serialize<schema_pb.GetSellOrdersReply>;
    responseDeserialize: grpc.deserialize<schema_pb.GetSellOrdersReply>;
}

export const OrderService: IOrderService;

export interface IOrderServer {
    createSellOrder: grpc.handleUnaryCall<schema_pb.CreateOrderRequest, schema_pb.CreateOrderReply>;
    createBuyOrder: grpc.handleUnaryCall<schema_pb.CreateOrderRequest, schema_pb.CreateOrderReply>;
    getSellOrders: grpc.handleServerStreamingCall<schema_pb.GetSellOrdersRequest, schema_pb.GetSellOrdersReply>;
}

export interface IOrderClient {
    createSellOrder(request: schema_pb.CreateOrderRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateOrderReply) => void): grpc.ClientUnaryCall;
    createSellOrder(request: schema_pb.CreateOrderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateOrderReply) => void): grpc.ClientUnaryCall;
    createSellOrder(request: schema_pb.CreateOrderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateOrderReply) => void): grpc.ClientUnaryCall;
    createBuyOrder(request: schema_pb.CreateOrderRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateOrderReply) => void): grpc.ClientUnaryCall;
    createBuyOrder(request: schema_pb.CreateOrderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateOrderReply) => void): grpc.ClientUnaryCall;
    createBuyOrder(request: schema_pb.CreateOrderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateOrderReply) => void): grpc.ClientUnaryCall;
    getSellOrders(request: schema_pb.GetSellOrdersRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<schema_pb.GetSellOrdersReply>;
    getSellOrders(request: schema_pb.GetSellOrdersRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<schema_pb.GetSellOrdersReply>;
}

export class OrderClient extends grpc.Client implements IOrderClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createSellOrder(request: schema_pb.CreateOrderRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateOrderReply) => void): grpc.ClientUnaryCall;
    public createSellOrder(request: schema_pb.CreateOrderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateOrderReply) => void): grpc.ClientUnaryCall;
    public createSellOrder(request: schema_pb.CreateOrderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateOrderReply) => void): grpc.ClientUnaryCall;
    public createBuyOrder(request: schema_pb.CreateOrderRequest, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateOrderReply) => void): grpc.ClientUnaryCall;
    public createBuyOrder(request: schema_pb.CreateOrderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateOrderReply) => void): grpc.ClientUnaryCall;
    public createBuyOrder(request: schema_pb.CreateOrderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: schema_pb.CreateOrderReply) => void): grpc.ClientUnaryCall;
    public getSellOrders(request: schema_pb.GetSellOrdersRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<schema_pb.GetSellOrdersReply>;
    public getSellOrders(request: schema_pb.GetSellOrdersRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<schema_pb.GetSellOrdersReply>;
}
