// package: price
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class GetPriceRequest extends jspb.Message { 
    getFromCurrency(): string;
    setFromCurrency(value: string): GetPriceRequest;

    getToCurrency(): string;
    setToCurrency(value: string): GetPriceRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetPriceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetPriceRequest): GetPriceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetPriceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetPriceRequest;
    static deserializeBinaryFromReader(message: GetPriceRequest, reader: jspb.BinaryReader): GetPriceRequest;
}

export namespace GetPriceRequest {
    export type AsObject = {
        fromCurrency: string,
        toCurrency: string,
    }
}

export class GetPriceReply extends jspb.Message { 
    getPriceId(): string;
    setPriceId(value: string): GetPriceReply;

    getPrice(): string;
    setPrice(value: string): GetPriceReply;

    getFromCurrency(): string;
    setFromCurrency(value: string): GetPriceReply;

    getToCurrency(): string;
    setToCurrency(value: string): GetPriceReply;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetPriceReply.AsObject;
    static toObject(includeInstance: boolean, msg: GetPriceReply): GetPriceReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetPriceReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetPriceReply;
    static deserializeBinaryFromReader(message: GetPriceReply, reader: jspb.BinaryReader): GetPriceReply;
}

export namespace GetPriceReply {
    export type AsObject = {
        priceId: string,
        price: string,
        fromCurrency: string,
        toCurrency: string,
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
