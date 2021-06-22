import grpc from "grpc";
import { injectable } from "inversify";
import "reflect-metadata";
import { IContext } from "../server/interface/IContext";
import { GetWithdrawRequest, GetWithdrawReply } from "../server/protos/schema_pb";
import { WithdrawServiceErrorCodes } from "../service/error";

type gRPCServerUnaryCall<Request, Reply> = {
  call: grpc.ServerUnaryCall<Request>;
  callback: grpc.sendUnaryData<Reply>;
};

type gRPCServerWritableStream<Request> = {
  call: grpc.ServerWritableStream<Request>;
};

@injectable()
export class Controller {
  public static type: string = "Controller";

  async unaryCallMethod(
    { call, callback }: gRPCServerUnaryCall<GetWithdrawRequest, GetWithdrawReply>,
    { dao }: IContext
  ) {
    try {
    } catch (error) {
      callback(error, null);
    }
  }

  async serverWritableStreamMethod(
    { call }: gRPCServerWritableStream<GetWithdrawRequest>,
    { dao }: IContext
  ) {
    try {
    } catch (error) {}
  }
}
