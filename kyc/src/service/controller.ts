import grpc from "grpc";
import { injectable } from "inversify";
import "reflect-metadata";
import { IContext } from "../server/interface/IContext";
import {
  ProcessPassportDataReply,
  ProcessPassportDataRequest,
} from "../server/protos/schema_pb";

type GRPC = {
  call: grpc.ServerUnaryCall<ProcessPassportDataRequest>;
  callback: grpc.sendUnaryData<ProcessPassportDataReply>;
};

export interface IController {
  processPassportData: (grpc: GRPC, context: IContext) => Promise<void>;
}

@injectable()
export class Controller implements IController {
  public static type: string = "Controller";

  async processPassportData({ call, callback }: GRPC, { dao }: IContext) {
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
