// package: wallet
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CreateWalletRequest extends jspb.Message { 
    getTelegramFromUserId(): string;
    setTelegramFromUserId(value: string): CreateWalletRequest;
    getRapydEWallet(): string;
    setRapydEWallet(value: string): CreateWalletRequest;
    getRapydEWalletReference(): string;
    setRapydEWalletReference(value: string): CreateWalletRequest;
    getWalletType(): string;
    setWalletType(value: string): CreateWalletRequest;

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
        telegramFromUserId: string,
        rapydEWallet: string,
        rapydEWalletReference: string,
        walletType: string,
    }
}

export class CreateWalletResponse extends jspb.Message { 
    getWalletId(): string;
    setWalletId(value: string): CreateWalletResponse;
    getUserId(): string;
    setUserId(value: string): CreateWalletResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateWalletResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateWalletResponse): CreateWalletResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateWalletResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateWalletResponse;
    static deserializeBinaryFromReader(message: CreateWalletResponse, reader: jspb.BinaryReader): CreateWalletResponse;
}

export namespace CreateWalletResponse {
    export type AsObject = {
        walletId: string,
        userId: string,
    }
}
