import grpc from "grpc";
import { IContext } from "./interface/IContext";
import { IUserServer, UserService } from "./protos/schema_grpc_pb";

export default (context: IContext) => {
  const server = new grpc.Server();

  server.addService<IUserServer>(UserService, {
    findUserByTelegramUserIdOrCreateUser: (call, callback) =>
      context.controller.findUserByTelegramUserIdOrCreateUser({ call, callback }, context),
    getUser: (call, callback) => context.controller.getUser({ call, callback }, context),
    getUsers: (call) => context.controller.getUsers({ call }, context),
    findUserByTelegramUserId: (call, callback) =>
      context.controller.findUserByTelegramUserId({ call, callback }, context),
    getUserIdByTelegramUsername: (call, callback) =>
      context.controller.getUserIdByTelegramUsername({ call, callback }, context),
  });

  return server;
};
