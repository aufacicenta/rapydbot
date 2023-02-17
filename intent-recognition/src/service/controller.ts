import * as grpc from "@grpc/grpc-js";

import { IContext } from "../server/interface/IContext";
import { ClassifyRequest, ClassifyReply } from "../server/protos/schema_pb";

type gRPCServerUnaryCall<Request, Reply> = {
  call: grpc.ServerUnaryCall<Request, Reply>;
  callback: grpc.sendUnaryData<Reply>;
};

export class Controller {
  public static type: string = "Controller";

  async classify(
    { call, callback }: gRPCServerUnaryCall<ClassifyRequest, ClassifyReply>,
    {}: IContext,
  ) {
    try {
      const input = call.request.getInput();

      // const response;

      const reply = new ClassifyReply();

      reply.setAction("send");

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }
}
