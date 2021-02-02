import grpc from "grpc";
import { IContext } from "./interface/IContext";
import {
  ITransactionServer,
  TransactionService,
} from "./protos/schema_grpc_pb";

export default (context: IContext) => {
  const server = new grpc.Server();

  server.addService<ITransactionServer>(TransactionService, {
    createTransaction: (call, callback) =>
      context.controller.createTransaction({ call, callback }, context),
    getSellOrders: (call, callback) =>
      context.controller.getSellOrders({ call, callback }, context),
  });

  return server;
};
