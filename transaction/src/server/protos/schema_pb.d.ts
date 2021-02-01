// package: transaction
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CreateTransactionRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): CreateTransactionRequest;

    getAmount(): number;
    setAmount(value: number): CreateTransactionRequest;

    getFromCurrency(): string;
    setFromCurrency(value: string): CreateTransactionRequest;

    getToCurrency(): string;
    setToCurrency(value: string): CreateTransactionRequest;


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
        amount: number,
        fromCurrency: string,
        toCurrency: string,
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

export class GetTransactionBreakdownRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): GetTransactionBreakdownRequest;

    getFromCurrency(): string;
    setFromCurrency(value: string): GetTransactionBreakdownRequest;

    getToCurrency(): string;
    setToCurrency(value: string): GetTransactionBreakdownRequest;

    getAmount(): number;
    setAmount(value: number): GetTransactionBreakdownRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTransactionBreakdownRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetTransactionBreakdownRequest): GetTransactionBreakdownRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTransactionBreakdownRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTransactionBreakdownRequest;
    static deserializeBinaryFromReader(message: GetTransactionBreakdownRequest, reader: jspb.BinaryReader): GetTransactionBreakdownRequest;
}

export namespace GetTransactionBreakdownRequest {
    export type AsObject = {
        userId: string,
        fromCurrency: string,
        toCurrency: string,
        amount: number,
    }
}

export class GetTransactionBreakdownReply extends jspb.Message { 
    getCurrencyPair(): string;
    setCurrencyPair(value: string): GetTransactionBreakdownReply;

    getPrice(): string;
    setPrice(value: string): GetTransactionBreakdownReply;

    getExchangeRate(): string;
    setExchangeRate(value: string): GetTransactionBreakdownReply;

    getExchangeRateResult(): string;
    setExchangeRateResult(value: string): GetTransactionBreakdownReply;

    getFee(): string;
    setFee(value: string): GetTransactionBreakdownReply;

    getFeeResult(): string;
    setFeeResult(value: string): GetTransactionBreakdownReply;

    getTotalResult(): string;
    setTotalResult(value: string): GetTransactionBreakdownReply;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTransactionBreakdownReply.AsObject;
    static toObject(includeInstance: boolean, msg: GetTransactionBreakdownReply): GetTransactionBreakdownReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTransactionBreakdownReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTransactionBreakdownReply;
    static deserializeBinaryFromReader(message: GetTransactionBreakdownReply, reader: jspb.BinaryReader): GetTransactionBreakdownReply;
}

export namespace GetTransactionBreakdownReply {
    export type AsObject = {
        currencyPair: string,
        price: string,
        exchangeRate: string,
        exchangeRateResult: string,
        fee: string,
        feeResult: string,
        totalResult: string,
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
