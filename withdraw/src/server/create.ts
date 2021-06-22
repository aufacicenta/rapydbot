import grpc from "grpc";
import { IContext } from "./interface/IContext";
import { IWithdrawServer, WithdrawService } from "./protos/schema_grpc_pb";

export default (context: IContext) => {
const server = new grpc.Server();

server.addService<IWithdrawServer>(WithdrawService, {
  getWithdraw: (call, callback) =>
  context.controller.getWithdraw({ call, callback }, context),
  });

  return server;
  };