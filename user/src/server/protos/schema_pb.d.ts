// package: user
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CreateUserRequest extends jspb.Message { 
    getTelegramFromUserId(): number;
    setTelegramFromUserId(value: number): CreateUserRequest;

    getTelegramUsername(): string;
    setTelegramUsername(value: string): CreateUserRequest;

    getTelegramPrivateChatId(): string;
    setTelegramPrivateChatId(value: string): CreateUserRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateUserRequest): CreateUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateUserRequest;
    static deserializeBinaryFromReader(message: CreateUserRequest, reader: jspb.BinaryReader): CreateUserRequest;
}

export namespace CreateUserRequest {
    export type AsObject = {
        telegramFromUserId: number,
        telegramUsername: string,
        telegramPrivateChatId: string,
    }
}

export class CreateUserReply extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): CreateUserReply;

    getTelegramFromUserId(): number;
    setTelegramFromUserId(value: number): CreateUserReply;

    getTelegramUsername(): string;
    setTelegramUsername(value: string): CreateUserReply;

    getTelegramPrivateChatId(): number;
    setTelegramPrivateChatId(value: number): CreateUserReply;

    getTelegramUserId(): string;
    setTelegramUserId(value: string): CreateUserReply;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateUserReply.AsObject;
    static toObject(includeInstance: boolean, msg: CreateUserReply): CreateUserReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateUserReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateUserReply;
    static deserializeBinaryFromReader(message: CreateUserReply, reader: jspb.BinaryReader): CreateUserReply;
}

export namespace CreateUserReply {
    export type AsObject = {
        userId: string,
        telegramFromUserId: number,
        telegramUsername: string,
        telegramPrivateChatId: number,
        telegramUserId: string,
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
