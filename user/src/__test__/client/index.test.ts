import { Sequelize } from "sequelize/types";

import { CreateUserReply, UserClient, UserClientGenerator } from "../../client";
import database from "../../database";
import { User } from "../../database/user";
import { GetUserReply, GetUsersRequest } from "../../server/protos/schema_pb";

let driver: Sequelize, dao: User, client: UserClient;

const { IP_ADDRESS: address, HTTP_PORT: port } = process.env;

describe("client", () => {
  beforeAll(async () => {
    driver = await database.connect({ force: true });
    dao = new User(driver);
    client = new UserClientGenerator(`${address}:${port}`).create();
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
      const create_user_result = await dao.findUserByTelegramUserIdOrCreateUser({
        telegram_username: user.telegram_username,
        telegram_private_chat_id: user.telegram_private_chat_id,
        telegram_from_user_id: user.telegram_from_user_id,
      });

      result.push(create_user_result);
    }

    const request = new GetUsersRequest();
    request.setUserIdList(result.map((r) => r.userId));

    const getUsers = (): Promise<Array<GetUserReply.AsObject>> =>
      new Promise((resolve, reject) => {
        const call = client.getUsers(request);

        const response: Array<GetUserReply.AsObject> = [];

        call.on("data", (data: GetUserReply) => {
          response.push(data.toObject());
        });

        call.on("end", () => {
          resolve(response);
        });
      });

    const response = await getUsers();

    expect(response.length).toEqual(2);
  });
});
