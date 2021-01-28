// package: kyc
// file: schema.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ProcessPassportDataRequest extends jspb.Message { 
    getDocumentNo(): string;
    setDocumentNo(value: string): ProcessPassportDataRequest;

    getExpiryDate(): string;
    setExpiryDate(value: string): ProcessPassportDataRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProcessPassportDataRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ProcessPassportDataRequest): ProcessPassportDataRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProcessPassportDataRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProcessPassportDataRequest;
    static deserializeBinaryFromReader(message: ProcessPassportDataRequest, reader: jspb.BinaryReader): ProcessPassportDataRequest;
}

export namespace ProcessPassportDataRequest {
    export type AsObject = {
        documentNo: string,
        expiryDate: string,
    }
}

export class ProcessPassportDataReply extends jspb.Message { 
    getOnSuccess(): boolean;
    setOnSuccess(value: boolean): ProcessPassportDataReply;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProcessPassportDataReply.AsObject;
    static toObject(includeInstance: boolean, msg: ProcessPassportDataReply): ProcessPassportDataReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProcessPassportDataReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProcessPassportDataReply;
    static deserializeBinaryFromReader(message: ProcessPassportDataReply, reader: jspb.BinaryReader): ProcessPassportDataReply;
}

export namespace ProcessPassportDataReply {
    export type AsObject = {
        onSuccess: boolean,
    }
}
