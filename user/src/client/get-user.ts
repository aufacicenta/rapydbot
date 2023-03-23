import { UserClient } from "../server/protos/schema_grpc_pb";
import { GetUserRequest, GetUserReply } from "../server/protos/schema_pb";

export const getUser = (
  client: UserClient,
  { userId }: GetUserRequest.AsObject,
): Promise<GetUserReply.AsObject> => {
  const request = new GetUserRequest();

  request.setUserId(userId);

  return new Promise((resolve, reject) => {
    client.getUser(request, (error, reply) => {
      if (Boolean(error)) {
        return reject(error);
      }

      const userId = reply.getUserId();
      const telegramFromUserId = reply.getTelegramFromUserId();
      const telegramUsername = reply.getTelegramUsername();
      const telegramPrivateChatId = reply.getTelegramPrivateChatId();
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
