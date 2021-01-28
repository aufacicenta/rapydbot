import grpc from "grpc";
import { IContext } from "./interface/IContext";
import { IKYCServer, KYCService } from "./protos/schema_grpc_pb";

export default ({ controller }: IContext) => {
  const server = new grpc.Server();

  server.addService<IKYCServer>(KYCService, controller);

  return server;
};
