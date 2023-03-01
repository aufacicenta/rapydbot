import { UserClient } from "../server/protos/schema_grpc_pb";
import {
  FindUserByTelegramUserIdRequest,
  FindUserByTelegramUserIdReply,
} from "../server/protos/schema_pb";

export const findUserByTelegramUserId = (
  client: UserClient,
  { telegramFromUserId }: FindUserByTelegramUserIdRequest.AsObject,
): Promise<FindUserByTelegramUserIdReply.AsObject> => {
  const request = new FindUserByTelegramUserIdRequest();

  request.setTelegramFromUserId(telegramFromUserId);

  return new Promise((resolve, reject) => {
    client.findUserByTelegramUserId(request, (error, reply) => {
      if (Boolean(error)) {
        return reject(error);
      }

      const userId = reply.getUserId();

      resolve({ userId });
    });
  });
};
