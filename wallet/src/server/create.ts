import grpc from "grpc";
import { IContext } from "./interface/IContext";
import { IWalletServer, WalletService } from "./protos/schema_grpc_pb";

export default (context: IContext) => {
  const server = new grpc.Server();

  server.addService<IWalletServer>(WalletService, {
    createWallet: (call, callback) =>
      context.controller.createWallet({ call, callback }, context),
    topUpWallet: (call, callback) =>
      context.controller.topUpWallet({ call, callback }, context),
  });

  return server;
};
