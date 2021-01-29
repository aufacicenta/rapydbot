import grpc from "grpc";
import { IContext } from "./interface/IContext";
import { IUSERServer, USERService } from "./protos/schema_grpc_pb";

export default (context: IContext) => {
  const server = new grpc.Server();

  server.addService<IUSERServer>(USERService, {
    createUser: (call, callback) =>
      context.controller.createUser({ call, callback }, context),
    resolveUserIDFromTelegramUserID: (call, callback) =>
      context.controller.resolveUserIDFromTelegramUserID(
        { call, callback },
        context
      ),
    findUserByTelegramUserIdOrCreateUser: (call, callback) =>
      context.controller.findUserByTelegramUserIdOrCreateUser(
        { call, callback },
        context
      ),
  });

  return server;
};
