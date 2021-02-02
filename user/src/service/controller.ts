import grpc from "grpc";
import { injectable } from "inversify";
import "reflect-metadata";
import { IContext } from "../server/interface/IContext";
import { CreateUserReply, CreateUserRequest } from "../server/protos/schema_pb";

type GRPC<Request, Reply> = {
  call: grpc.ServerUnaryCall<Request>;
  callback: grpc.sendUnaryData<Reply>;
};

@injectable()
export class Controller {
  public static type: string = "Controller";

  async findUserByTelegramUserIdOrCreateUser(
    { call, callback }: GRPC<CreateUserRequest, CreateUserReply>,
    { dao }: IContext
  ) {
    const telegram_from_user_id = call.request.getTelegramFromUserId();
    const telegram_username = call.request.getTelegramUsername();
    const telegram_private_chat_id = call.request.getTelegramPrivateChatId();

    const result = await dao.UserDAO.findUserByTelegramUserIdOrCreateUser({
      telegram_from_user_id,
      telegram_username,
      telegram_private_chat_id,
    });

    const reply = new CreateUserReply();

    reply.setUserId(result.userId);
    reply.setTelegramFromUserId(result.telegramFromUserId);
    reply.setTelegramUsername(result.telegramUsername);
    reply.setTelegramPrivateChatId(result.telegramPrivateChatId);

    callback(null, reply);
  }
}
