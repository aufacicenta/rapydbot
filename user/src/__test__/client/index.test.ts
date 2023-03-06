import { CreateUserReply, UserClient, UserClientGenerator } from "../../client";
import { createUserLocation } from "../../client/create-user-location";
import { findUserByTelegramUserIdOrCreateUser } from "../../client/find-user-by-telegram-user-id-or-create-user";
import { getUsers } from "../../client/get-users";

let client: UserClient;

const { IP_ADDRESS, HTTP_PORT } = process.env;

describe("client", () => {
  beforeAll(async () => {
    client = new UserClientGenerator(`${IP_ADDRESS}:${HTTP_PORT}`).create();
  });

  test("success: getUsers", async () => {
    const users = [
      {
        telegram_username: "username1",
        telegram_from_user_id: 1,
        telegram_private_chat_id: 1,
      },
      {
        telegram_username: "username2",
        telegram_from_user_id: 2,
        telegram_private_chat_id: 2,
      },
    ];

    const result: Array<CreateUserReply.AsObject> = [];

    for (const user of users) {
      const reply = await findUserByTelegramUserIdOrCreateUser(client, {
        telegramFromUserId: user.telegram_from_user_id,
        telegramPrivateChatId: user.telegram_private_chat_id,
        telegramUsername: user.telegram_username,
      });

      result.push(reply);
    }

    const response = await getUsers(client, { userIdList: result.map((u) => u.userId) });

    expect(response.length).toEqual(2);
  });

  test("success: create user location", async () => {
    const user = {
      telegram_username: "username3",
      telegram_from_user_id: 3,
      telegram_private_chat_id: 3,
    };

    const { userId } = await findUserByTelegramUserIdOrCreateUser(client, {
      telegramFromUserId: user.telegram_from_user_id,
      telegramPrivateChatId: user.telegram_private_chat_id,
      telegramUsername: user.telegram_username,
    });

    const { longitude, latitude } = await createUserLocation(client, {
      userId,
      longitude: 0.1234,
      latitude: 0.1234,
    });

    expect(longitude).toEqual(0.1234);
    expect(latitude).toEqual(0.1234);
  });
});
