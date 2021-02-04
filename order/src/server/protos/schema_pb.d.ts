// package: order
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CreateOrderRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): CreateOrderRequest;

    getFromCurrency(): string;
    setFromCurrency(value: string): CreateOrderRequest;

    getToCurrency(): string;
    setToCurrency(value: string): CreateOrderRequest;

    getAmount(): number;
    setAmount(value: number): CreateOrderRequest;

    getPriceId(): string;
    setPriceId(value: string): CreateOrderRequest;

    getType(): string;
    setType(value: string): CreateOrderRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateOrderRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateOrderRequest): CreateOrderRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateOrderRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateOrderRequest;
    static deserializeBinaryFromReader(message: CreateOrderRequest, reader: jspb.BinaryReader): CreateOrderRequest;
}

export namespace CreateOrderRequest {
    export type AsObject = {
        userId: string,
        fromCurrency: string,
        toCurrency: string,
        amount: number,
        priceId: string,
        type: string,
    }
}

export class CreateOrderReply extends jspb.Message { 
    getTransactionId(): string;
    setTransactionId(value: string): CreateOrderReply;

    getExpiresAt(): string;
    setExpiresAt(value: string): CreateOrderReply;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateOrderReply.AsObject;
    static toObject(includeInstance: boolean, msg: CreateOrderReply): CreateOrderReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateOrderReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateOrderReply;
    static deserializeBinaryFromReader(message: CreateOrderReply, reader: jspb.BinaryReader): CreateOrderReply;
}

export namespace CreateOrderReply {
    export type AsObject = {
        transactionId: string,
        expiresAt: string,
    }
}

export class GetSellOrdersRequest extends jspb.Message { 
    getAmount(): number;
    setAmount(value: number): GetSellOrdersRequest;

    getFromCurrency(): string;
    setFromCurrency(value: string): GetSellOrdersRequest;

    getToCurrency(): string;
    setToCurrency(value: string): GetSellOrdersRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSellOrdersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetSellOrdersRequest): GetSellOrdersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSellOrdersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSellOrdersRequest;
    static deserializeBinaryFromReader(message: GetSellOrdersRequest, reader: jspb.BinaryReader): GetSellOrdersRequest;
}

export namespace GetSellOrdersRequest {
    export type AsObject = {
        amount: number,
        fromCurrency: string,
        toCurrency: string,
    }
}

export class GetSellOrdersReply extends jspb.Message { 
    getAmount(): number;
    setAmount(value: number): GetSellOrdersReply;

    getFromCurrency(): string;
    setFromCurrency(value: string): GetSellOrdersReply;

    getToCurrency(): string;
    setToCurrency(value: string): GetSellOrdersReply;

    getPrice(): number;
    setPrice(value: number): GetSellOrdersReply;

    getTelegramUsername(): string;
    setTelegramUsername(value: string): GetSellOrdersReply;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSellOrdersReply.AsObject;
    static toObject(includeInstance: boolean, msg: GetSellOrdersReply): GetSellOrdersReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSellOrdersReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSellOrdersReply;
    static deserializeBinaryFromReader(message: GetSellOrdersReply, reader: jspb.BinaryReader): GetSellOrdersReply;
}

export namespace GetSellOrdersReply {
    export type AsObject = {
        amount: number,
        fromCurrency: string,
        toCurrency: string,
        price: number,
        telegramUsername: string,
    }
}

export class EmptyReply extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EmptyReply.AsObject;
    static toObject(includeInstance: boolean, msg: EmptyReply): EmptyReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EmptyReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EmptyReply;
    static deserializeBinaryFromReader(message: EmptyReply, reader: jspb.BinaryReader): EmptyReply;
}

export namespace EmptyReply {
    export type AsObject = {
    }
}
