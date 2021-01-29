// package: user
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CreateUserRequest extends jspb.Message { 
    getTelegramUserId(): number;
    setTelegramUserId(value: number): CreateUserRequest;


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
        telegramUserId: number,
    }
}

export class CreateUserReply extends jspb.Message { 
    getId(): string;
    setId(value: string): CreateUserReply;


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
        id: string,
    }
}

export class ResolveUserIDFromTelegramUserIDRequest extends jspb.Message { 
    getTelegramUserId(): number;
    setTelegramUserId(value: number): ResolveUserIDFromTelegramUserIDRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResolveUserIDFromTelegramUserIDRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ResolveUserIDFromTelegramUserIDRequest): ResolveUserIDFromTelegramUserIDRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResolveUserIDFromTelegramUserIDRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResolveUserIDFromTelegramUserIDRequest;
    static deserializeBinaryFromReader(message: ResolveUserIDFromTelegramUserIDRequest, reader: jspb.BinaryReader): ResolveUserIDFromTelegramUserIDRequest;
}

export namespace ResolveUserIDFromTelegramUserIDRequest {
    export type AsObject = {
        telegramUserId: number,
    }
}

export class ResolveUserIDFromTelegramUserIDReply extends jspb.Message { 
    getId(): string;
    setId(value: string): ResolveUserIDFromTelegramUserIDReply;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResolveUserIDFromTelegramUserIDReply.AsObject;
    static toObject(includeInstance: boolean, msg: ResolveUserIDFromTelegramUserIDReply): ResolveUserIDFromTelegramUserIDReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResolveUserIDFromTelegramUserIDReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResolveUserIDFromTelegramUserIDReply;
    static deserializeBinaryFromReader(message: ResolveUserIDFromTelegramUserIDReply, reader: jspb.BinaryReader): ResolveUserIDFromTelegramUserIDReply;
}

export namespace ResolveUserIDFromTelegramUserIDReply {
    export type AsObject = {
        id: string,
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
