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
    transferFromWallet: (call, callback) =>
      context.controller.transferFromWallet({ call, callback }, context),
    setTransferFromWalletResponse: (call, callback) =>
      context.controller.setTransferFromWalletResponse(
        { call, callback },
        context
      ),
    getWalletBalance: (call, callback) =>
      context.controller.getWalletBalance({ call, callback }, context),
    setWalletCurrencyCode: (call, callback) =>
      context.controller.setWalletCurrencyCode({ call, callback }, context),
    getWalletCurrencyCode: (call, callback) =>
      context.controller.getWalletCurrencyCode({ call, callback }, context),
    setWalletCountryCode: (call, callback) =>
      context.controller.setWalletCountryCode({ call, callback }, context),
    getWalletCountryCode: (call, callback) =>
      context.controller.getWalletCountryCode({ call, callback }, context),
  });

  return server;
};
