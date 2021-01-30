import grpc from "grpc";
import { injectable } from "inversify";
import "reflect-metadata";
import { IContext } from "../server/interface/IContext";
import {
  CreateUserReply,
  CreateUserRequest,
  ResolveUserIDFromTelegramUserIDReply,
  ResolveUserIDFromTelegramUserIDRequest,
} from "../server/protos/schema_pb";

type GRPC<Request, Reply> = {
  call: grpc.ServerUnaryCall<Request>;
  callback: grpc.sendUnaryData<Reply>;
};

@injectable()
export class Controller {
  public static type: string = "Controller";

  async createUser(
    { call, callback }: GRPC<CreateUserRequest, CreateUserReply>,
    { dao }: IContext
  ) {
    const telegram_user_id = call.request.getTelegramUserId();

    const result = await dao.UserDAO.createUser({
      telegram_user_id,
    });

    const reply = new CreateUserReply();

    reply.setId(result.getDataValue("id"));

    callback(null, reply);
  }

  async findUserByTelegramUserIdOrCreateUser(
    { call, callback }: GRPC<CreateUserRequest, CreateUserReply>,
    { dao }: IContext
  ) {
    const telegram_user_id = call.request.getTelegramUserId();

    const id = await dao.UserDAO.findUserByTelegramUserIdOrCreateUser({
      telegram_user_id,
    });

    const reply = new CreateUserReply();

    reply.setId(id);

    callback(null, reply);
  }

  async resolveUserIDFromTelegramUserID(
    {
      call,
      callback,
    }: GRPC<
      ResolveUserIDFromTelegramUserIDRequest,
      ResolveUserIDFromTelegramUserIDReply
    >,
    { dao }: IContext
  ) {
    console.log("resolveUserIDFromTelegramUserID");
    const telegram_user_id = call.request.getTelegramUserId();

    const id = await dao.UserDAO.resolveUserIDFromTelegramUserID({
      telegram_user_id,
    });

    if (!Boolean(id)) {
      throw new Error("Not Found");
    }

    let reply = new ResolveUserIDFromTelegramUserIDReply();

    reply.setId(id);

    callback(null, reply);
  }
}
