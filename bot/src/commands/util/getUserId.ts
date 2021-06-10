import { FindUserByTelegramUserIdRequest, UserClient } from "@rapydbot/user/client";
import { Message } from "node-telegram-bot-api";

export default (msg: Message, client: UserClient): Promise<string> => {
  return new Promise((resolve, reject) => {
    const findUserRequestByTelegram = new FindUserByTelegramUserIdRequest();

    findUserRequestByTelegram.setTelegramFromUserId(msg.from.id);

    client.findUserByTelegramUserId(findUserRequestByTelegram, (error, reply) => {
      if (Boolean(error)) {
        return reject(error);
      }

      const user_id = reply.getUserId();
      resolve(user_id);
    });
  });
};
