// package: wallet
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CreateWalletRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): CreateWalletRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateWalletRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateWalletRequest): CreateWalletRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateWalletRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateWalletRequest;
    static deserializeBinaryFromReader(message: CreateWalletRequest, reader: jspb.BinaryReader): CreateWalletRequest;
}

export namespace CreateWalletRequest {
    export type AsObject = {
        userId: string,
    }
}

export class CreateWalletReply extends jspb.Message { 
    getRapydEwalletAddress(): string;
    setRapydEwalletAddress(value: string): CreateWalletReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateWalletReply.AsObject;
    static toObject(includeInstance: boolean, msg: CreateWalletReply): CreateWalletReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateWalletReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateWalletReply;
    static deserializeBinaryFromReader(message: CreateWalletReply, reader: jspb.BinaryReader): CreateWalletReply;
}

export namespace CreateWalletReply {
    export type AsObject = {
        rapydEwalletAddress: string,
    }
}

export class TopUpWalletRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): TopUpWalletRequest;
    getCountry(): string;
    setCountry(value: string): TopUpWalletRequest;
    getCurrency(): string;
    setCurrency(value: string): TopUpWalletRequest;
    getAmount(): number;
    setAmount(value: number): TopUpWalletRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TopUpWalletRequest.AsObject;
    static toObject(includeInstance: boolean, msg: TopUpWalletRequest): TopUpWalletRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TopUpWalletRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TopUpWalletRequest;
    static deserializeBinaryFromReader(message: TopUpWalletRequest, reader: jspb.BinaryReader): TopUpWalletRequest;
}

export namespace TopUpWalletRequest {
    export type AsObject = {
        userId: string,
        country: string,
        currency: string,
        amount: number,
    }
}

export class TopUpWalletReply extends jspb.Message { 
    getCheckoutPageUrl(): string;
    setCheckoutPageUrl(value: string): TopUpWalletReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TopUpWalletReply.AsObject;
    static toObject(includeInstance: boolean, msg: TopUpWalletReply): TopUpWalletReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TopUpWalletReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TopUpWalletReply;
    static deserializeBinaryFromReader(message: TopUpWalletReply, reader: jspb.BinaryReader): TopUpWalletReply;
}

export namespace TopUpWalletReply {
    export type AsObject = {
        checkoutPageUrl: string,
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
