import * as grpc from "@grpc/grpc-js";

import { IContext } from "./interface/IContext";
import { WalletService } from "./protos/schema_grpc_pb";

export default (context: IContext) => {
  const server = new grpc.Server();

  server.addService(WalletService, {
    getOfficialIdDocuments: (call, callback) =>
      context.controller.getOfficialIdDocuments({ call, callback }, context),
    getSupportedCountries: (call, callback) =>
      context.controller.getSupportedCountries({ call, callback }, context),
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
    getUserIdFromWalletAddress: (call, callback) =>
      context.controller.getUserIdFromWalletAddress(
        { call, callback },
        context
      ),
  });

  return server;
};
