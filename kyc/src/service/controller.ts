import grpc from "grpc";
import { injectable } from "inversify";
import "reflect-metadata";
import { IContext } from "../server/interface/IContext";
import {
  ProcessPassportDataReply,
  ProcessPassportDataRequest,
} from "../server/protos/schema_pb";

type GRPC<Request, Reply> = {
  call: grpc.ServerUnaryCall<Request>;
  callback: grpc.sendUnaryData<Reply>;
};
@injectable()
export class Controller {
  public static type: string = "Controller";

  async processPassportData(
    {
      call,
      callback,
    }: GRPC<ProcessPassportDataRequest, ProcessPassportDataReply>,
    { dao }: IContext
  ) {
    const base64_encrypted_data = call.request.getBase64EncryptedData();
    const key_id = call.request.getKeyId();
    const user_id = call.request.getUserId();

    const result = await dao.TelegramPassportDAO.createTelegramPassportData({
      user_id,
      base64_encrypted_data,
      key_id,
    });

    const reply = new ProcessPassportDataReply();

    reply.setOnSuccess(true);

    callback(null, reply);
  }
}
