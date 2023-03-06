import { UserClient } from "../server/protos/schema_grpc_pb";
import { CreateUserRequest, CreateUserReply } from "../server/protos/schema_pb";

export const findUserByTelegramUserIdOrCreateUser = (
  client: UserClient,
  { telegramFromUserId, telegramUsername, telegramPrivateChatId }: CreateUserRequest.AsObject,
): Promise<CreateUserReply.AsObject> => {
  const request = new CreateUserRequest();

  request.setTelegramFromUserId(telegramFromUserId);
  request.setTelegramUsername(telegramUsername);

  if (telegramPrivateChatId) {
    request.setTelegramPrivateChatId(telegramPrivateChatId);
  }

  return new Promise((resolve, reject) => {
    client.findUserByTelegramUserIdOrCreateUser(request, (error, reply) => {
      if (Boolean(error)) {
        return reject(error);
      }

      const userId = reply.getUserId();
      const telegramPrivateChatId = reply.getTelegramPrivateChatId();
      const telegramUsername = reply.getTelegramUsername();
      const telegramFromUserId = reply.getTelegramFromUserId();
      const telegramUserId = reply.getTelegramUserId();

      resolve({
        userId,
        telegramFromUserId,
        telegramUsername,
        telegramPrivateChatId,
        telegramUserId,
      });
    });
  });
};
