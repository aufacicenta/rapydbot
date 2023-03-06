import * as grpc from "@grpc/grpc-js";

import { IContext } from "./interface/IContext";
import { UserService } from "./protos/schema_grpc_pb";

export default (context: IContext) => {
  const server = new grpc.Server();

  server.addService(UserService, {
    findUserByTelegramUserIdOrCreateUser: (call, callback) =>
      context.controller.findUserByTelegramUserIdOrCreateUser({ call, callback }, context),
    getUser: (call, callback) => context.controller.getUser({ call, callback }, context),
    getUsers: (call) => context.controller.getUsers({ call }, context),
    findUserByTelegramUserId: (call, callback) =>
      context.controller.findUserByTelegramUserId({ call, callback }, context),
    getUserIdByTelegramUsername: (call, callback) =>
      context.controller.getUserIdByTelegramUsername({ call, callback }, context),
    getUserTelegramChatId: (call, callback) =>
      context.controller.getUserTelegramChatId({ call, callback }, context),
    createUserLocation: (call, callback) =>
      context.controller.createUserLocation({ call, callback }, context),
  });

  return server;
};
