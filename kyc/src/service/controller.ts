import grpc from "grpc";
import { injectable } from "inversify";
import "reflect-metadata";
import { IKYCServer } from "../server/protos/schema_grpc_pb";
import {
  ProcessPassportDataReply,
  ProcessPassportDataRequest,
} from "../server/protos/schema_pb";

@injectable()
export class Controller implements IKYCServer {
  public static type: string = "Controller";

  processPassportData(
    call: grpc.ServerUnaryCall<ProcessPassportDataRequest>,
    callback: grpc.sendUnaryData<ProcessPassportDataReply>
  ) {
    const reply = new ProcessPassportDataReply();

    console.log(`document_no: ${call.request.getDocumentNo()}`);
    console.log(`expiry_date: ${call.request.getExpiryDate()}`);

    // TODO store data in MySQL linked to a user_id
    const document_no = call.request.getDocumentNo();
    const expiry_date = call.request.getDocumentNo();

    reply.setOnSuccess(true);

    callback(null, reply);
  }
}
