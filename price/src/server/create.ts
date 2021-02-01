import grpc from "grpc";
import { IContext } from "./interface/IContext";
import { IPriceServer, PriceService } from "./protos/schema_grpc_pb";

export default (context: IContext) => {
  const server = new grpc.Server();

  server.addService<IPriceServer>(PriceService, {
    getPrice: (call, callback) =>
      context.controller.getPrice({ call, callback }, context),
  });

  return server;
};
