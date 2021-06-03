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

    getTelegramPrivateChatId(): number;
    setTelegramPrivateChatId(value: number): CreateUserRequest;


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
        telegramPrivateChatId: number,
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

export class GetUserRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): GetUserRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserRequest): GetUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserRequest;
    static deserializeBinaryFromReader(message: GetUserRequest, reader: jspb.BinaryReader): GetUserRequest;
}

export namespace GetUserRequest {
    export type AsObject = {
        userId: string,
    }
}

export class GetUsersRequest extends jspb.Message { 
    clearUserIdList(): void;
    getUserIdList(): Array<string>;
    setUserIdList(value: Array<string>): GetUsersRequest;
    addUserId(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUsersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetUsersRequest): GetUsersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUsersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUsersRequest;
    static deserializeBinaryFromReader(message: GetUsersRequest, reader: jspb.BinaryReader): GetUsersRequest;
}

export namespace GetUsersRequest {
    export type AsObject = {
        userIdList: Array<string>,
    }
}

export class GetUserReply extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): GetUserReply;

    getTelegramFromUserId(): number;
    setTelegramFromUserId(value: number): GetUserReply;

    getTelegramUsername(): string;
    setTelegramUsername(value: string): GetUserReply;

    getTelegramPrivateChatId(): number;
    setTelegramPrivateChatId(value: number): GetUserReply;

    getTelegramUserId(): string;
    setTelegramUserId(value: string): GetUserReply;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserReply.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserReply): GetUserReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserReply;
    static deserializeBinaryFromReader(message: GetUserReply, reader: jspb.BinaryReader): GetUserReply;
}

export namespace GetUserReply {
    export type AsObject = {
        userId: string,
        telegramFromUserId: number,
        telegramUsername: string,
        telegramPrivateChatId: number,
        telegramUserId: string,
    }
}

export class FindUserByTelegramUserIdRequest extends jspb.Message { 
    getTelegramFromUserId(): number;
    setTelegramFromUserId(value: number): FindUserByTelegramUserIdRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FindUserByTelegramUserIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FindUserByTelegramUserIdRequest): FindUserByTelegramUserIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FindUserByTelegramUserIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FindUserByTelegramUserIdRequest;
    static deserializeBinaryFromReader(message: FindUserByTelegramUserIdRequest, reader: jspb.BinaryReader): FindUserByTelegramUserIdRequest;
}

export namespace FindUserByTelegramUserIdRequest {
    export type AsObject = {
        telegramFromUserId: number,
    }
}

export class FindUserByTelegramUserIdReply extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): FindUserByTelegramUserIdReply;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FindUserByTelegramUserIdReply.AsObject;
    static toObject(includeInstance: boolean, msg: FindUserByTelegramUserIdReply): FindUserByTelegramUserIdReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FindUserByTelegramUserIdReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FindUserByTelegramUserIdReply;
    static deserializeBinaryFromReader(message: FindUserByTelegramUserIdReply, reader: jspb.BinaryReader): FindUserByTelegramUserIdReply;
}

export namespace FindUserByTelegramUserIdReply {
    export type AsObject = {
        userId: string,
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
