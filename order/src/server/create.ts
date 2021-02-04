import grpc from "grpc";
import { IContext } from "./interface/IContext";
import {
  ITransactionServer,
  TransactionService,
} from "./protos/schema_grpc_pb";

export default (context: IContext) => {
  const server = new grpc.Server();

  server.addService<ITransactionServer>(TransactionService, {
    createSellOrder: (call, callback) =>
      context.controller.createSellOrder({ call, callback }, context),
    createBuyOrder: (call, callback) =>
      context.controller.createBuyOrder({ call, callback }, context),
    getSellOrders: (call) =>
      context.controller.getSellOrders({ call }, context),
  });

  return server;
};
