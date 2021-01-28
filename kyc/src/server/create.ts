import grpc from "grpc";
import { IContext } from "./interface/IContext";
import { GreeterService, IGreeterServer } from "./protos/schema_grpc_pb";

export default ({ controller }: IContext) => {
  const server = new grpc.Server();

  server.addService<IGreeterServer>(GreeterService, controller);

  return server;
};
