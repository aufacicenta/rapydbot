import grpc from "grpc";
import { IContext } from "./interface/IContext";
import { IUserServer, UserService } from "./protos/schema_grpc_pb";

export default (context: IContext) => {
  const server = new grpc.Server();

  server.addService<IUserServer>(UserService, {
    findUserByTelegramUserIdOrCreateUser: (call, callback) =>
      context.controller.findUserByTelegramUserIdOrCreateUser(
        { call, callback },
        context
      ),
  });

  return server;
};
