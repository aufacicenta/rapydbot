// package: transaction
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CreateTransactionRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): CreateTransactionRequest;

    getFromCurrency(): string;
    setFromCurrency(value: string): CreateTransactionRequest;

    getToCurrency(): string;
    setToCurrency(value: string): CreateTransactionRequest;

    getAmount(): number;
    setAmount(value: number): CreateTransactionRequest;

    getPriceId(): string;
    setPriceId(value: string): CreateTransactionRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateTransactionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateTransactionRequest): CreateTransactionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateTransactionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateTransactionRequest;
    static deserializeBinaryFromReader(message: CreateTransactionRequest, reader: jspb.BinaryReader): CreateTransactionRequest;
}

export namespace CreateTransactionRequest {
    export type AsObject = {
        userId: string,
        fromCurrency: string,
        toCurrency: string,
        amount: number,
        priceId: string,
    }
}

export class CreateTransactionReply extends jspb.Message { 
    getTransactionId(): string;
    setTransactionId(value: string): CreateTransactionReply;

    getExpiresAt(): string;
    setExpiresAt(value: string): CreateTransactionReply;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateTransactionReply.AsObject;
    static toObject(includeInstance: boolean, msg: CreateTransactionReply): CreateTransactionReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateTransactionReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateTransactionReply;
    static deserializeBinaryFromReader(message: CreateTransactionReply, reader: jspb.BinaryReader): CreateTransactionReply;
}

export namespace CreateTransactionReply {
    export type AsObject = {
        transactionId: string,
        expiresAt: string,
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
