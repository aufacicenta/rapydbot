import { CreateUserReply, UserClient, UserClientGenerator } from "../../client";
import { createUserLocation } from "../../client/create-user-location";
import { findUserByTelegramUserIdOrCreateUser } from "../../client/find-user-by-telegram-user-id-or-create-user";
import { getUsers } from "../../client/get-users";
import { getUsersByLocationBounds } from "../../client/get-users-by-location-bounds";

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

  // @TODO Test: get users coordinates — success

  test("success: get users by location bounds", async () => {
    const user = {
      telegram_username: "username4",
      telegram_from_user_id: 4,
      telegram_private_chat_id: 4,
    };

    const { userId } = await findUserByTelegramUserIdOrCreateUser(client, {
      telegramFromUserId: user.telegram_from_user_id,
      telegramPrivateChatId: user.telegram_private_chat_id,
      telegramUsername: user.telegram_username,
    });

    await createUserLocation(client, {
      userId,
      longitude: -96.090_893_256_230_26,
      latitude: 10.181_874_502_651_226,
    });

    const bounds =
      "-101.61987572969912 20.214697532384136,-96.09089325623026 10.181874502651226,-74.70593064545574 14.871161186850912,-101.68714354609313 20.212972187847342,-101.61987572969912 20.214697532384136";

    const result = await getUsersByLocationBounds(client, { bounds });

    expect(result.length).toEqual(1);
    expect(result[0].longitude).toEqual(-96.090_893_256_230_26);
    expect(result[0].latitude).toEqual(10.181_874_502_651_226);
  });
});
