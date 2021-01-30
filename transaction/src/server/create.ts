import grpc from "grpc";
import { IContext } from "./interface/IContext";
import {
  ITransactionServer,
  TransactionService,
} from "./protos/schema_grpc_pb";

export default (context: IContext) => {
  const server = new grpc.Server();

  server.addService<ITransactionServer>(TransactionService, {
    createUser: (call, callback) =>
      context.controller.createUser({ call, callback }, context),
  });

  return server;
};
