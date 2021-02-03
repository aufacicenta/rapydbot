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
    getSellOrders: (call) =>
      context.controller.getSellOrders({ call }, context),
  });

  return server;
};
