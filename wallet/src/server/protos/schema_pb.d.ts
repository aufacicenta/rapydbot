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

export class TransferFromWalletRequest extends jspb.Message { 
    getSenderUserId(): string;
    setSenderUserId(value: string): TransferFromWalletRequest;
    getRecipientUserId(): string;
    setRecipientUserId(value: string): TransferFromWalletRequest;
    getCurrency(): string;
    setCurrency(value: string): TransferFromWalletRequest;
    getAmount(): number;
    setAmount(value: number): TransferFromWalletRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransferFromWalletRequest.AsObject;
    static toObject(includeInstance: boolean, msg: TransferFromWalletRequest): TransferFromWalletRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransferFromWalletRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransferFromWalletRequest;
    static deserializeBinaryFromReader(message: TransferFromWalletRequest, reader: jspb.BinaryReader): TransferFromWalletRequest;
}

export namespace TransferFromWalletRequest {
    export type AsObject = {
        senderUserId: string,
        recipientUserId: string,
        currency: string,
        amount: number,
    }
}

export class TransferFromWalletReply extends jspb.Message { 
    getPendingTransactionId(): string;
    setPendingTransactionId(value: string): TransferFromWalletReply;
    getSenderUserId(): string;
    setSenderUserId(value: string): TransferFromWalletReply;
    getRecipientUserId(): string;
    setRecipientUserId(value: string): TransferFromWalletReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransferFromWalletReply.AsObject;
    static toObject(includeInstance: boolean, msg: TransferFromWalletReply): TransferFromWalletReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransferFromWalletReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransferFromWalletReply;
    static deserializeBinaryFromReader(message: TransferFromWalletReply, reader: jspb.BinaryReader): TransferFromWalletReply;
}

export namespace TransferFromWalletReply {
    export type AsObject = {
        pendingTransactionId: string,
        senderUserId: string,
        recipientUserId: string,
    }
}

export class SetTransferFromWalletResponseRequest extends jspb.Message { 
    getPendingTransactionId(): string;
    setPendingTransactionId(value: string): SetTransferFromWalletResponseRequest;
    getSenderUserId(): string;
    setSenderUserId(value: string): SetTransferFromWalletResponseRequest;
    getRecipientUserId(): string;
    setRecipientUserId(value: string): SetTransferFromWalletResponseRequest;
    getResponseStatus(): string;
    setResponseStatus(value: string): SetTransferFromWalletResponseRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetTransferFromWalletResponseRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SetTransferFromWalletResponseRequest): SetTransferFromWalletResponseRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetTransferFromWalletResponseRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetTransferFromWalletResponseRequest;
    static deserializeBinaryFromReader(message: SetTransferFromWalletResponseRequest, reader: jspb.BinaryReader): SetTransferFromWalletResponseRequest;
}

export namespace SetTransferFromWalletResponseRequest {
    export type AsObject = {
        pendingTransactionId: string,
        senderUserId: string,
        recipientUserId: string,
        responseStatus: string,
    }
}

export class SetTransferFromWalletResponseReply extends jspb.Message { 
    getAmount(): number;
    setAmount(value: number): SetTransferFromWalletResponseReply;
    getCurrency(): string;
    setCurrency(value: string): SetTransferFromWalletResponseReply;
    getSenderUserId(): string;
    setSenderUserId(value: string): SetTransferFromWalletResponseReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetTransferFromWalletResponseReply.AsObject;
    static toObject(includeInstance: boolean, msg: SetTransferFromWalletResponseReply): SetTransferFromWalletResponseReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetTransferFromWalletResponseReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetTransferFromWalletResponseReply;
    static deserializeBinaryFromReader(message: SetTransferFromWalletResponseReply, reader: jspb.BinaryReader): SetTransferFromWalletResponseReply;
}

export namespace SetTransferFromWalletResponseReply {
    export type AsObject = {
        amount: number,
        currency: string,
        senderUserId: string,
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
