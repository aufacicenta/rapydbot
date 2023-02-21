import { FindUserByTelegramUserIdRequest, UserClient } from "@rapydbot/user/client";

import { CustomMessage } from "../types";

export default (msg: CustomMessage, client: UserClient): Promise<string> => {
  const request = new FindUserByTelegramUserIdRequest();

  request.setTelegramFromUserId(msg.from.id);

  return new Promise((resolve, reject) => {
    client.findUserByTelegramUserId(request, (error, reply) => {
      if (Boolean(error)) {
        return reject(error);
      }

      const user_id = reply.getUserId();

      resolve(user_id);
    });
  });
};
