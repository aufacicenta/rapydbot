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
    setWalletCurrency: (call, callback) =>
      context.controller.setWalletCurrency({ call, callback }, context),
    getWalletEstablishedCurrency: (call, callback) =>
      context.controller.getWalletEstablishedCurrency(
        { call, callback },
        context
      ),
    setWalletCountry: (call, callback) =>
      context.controller.setWalletCountry({ call, callback }, context),
    getWalletEstablishedCountry: (call, callback) =>
      context.controller.getWalletEstablishedCountry(
        { call, callback },
        context
      ),
  });

  return server;
};
