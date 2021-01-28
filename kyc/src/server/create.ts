import grpc from "grpc";
import { IContext } from "./interface/IContext";
import { IKYCServer, KYCService } from "./protos/schema_grpc_pb";

export default (context: IContext) => {
  const server = new grpc.Server();

  server.addService<IKYCServer>(KYCService, {
    processPassportData: (call, callback) =>
      context.controller.processPassportData({ call, callback }, context),
  });

  return server;
};
