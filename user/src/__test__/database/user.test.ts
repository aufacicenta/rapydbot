import { Sequelize } from "sequelize/types";
import database from "../../database";
import { TelegramModel } from "../../database/model/telegram";
import { UserModel } from "../../database/model/user";
import { User } from "../../database/user";

let driver: Sequelize, dao: User;

describe("database:dao:user", () => {
  beforeEach(async () => {
    driver = await database.connect({ force: true });
    dao = new User(driver);
  });

  test("success: findUserByTelegramUserIdOrCreateUser", async () => {
    const telegram_username = "username";
    const telegram_from_user_id = 123;

    const create_result = await dao.findOrCreate({
      telegram_from_user_id,
      telegram_username,
    });

    expect(create_result.telegramUsername).toEqual(telegram_username);
    expect(create_result.telegramFromUserId).toEqual(telegram_from_user_id);
    expect(create_result.telegramUserId).toBeTruthy();
    expect(create_result.telegramPrivateChatId).toBeNull();
    expect(create_result.userId).toBeTruthy();

    const telegram_private_chat_id = 234;

    const update_result = await dao.findOrCreate({
      telegram_from_user_id,
      telegram_username,
      telegram_private_chat_id,
    });

    expect(update_result.telegramPrivateChatId).toEqual(telegram_private_chat_id);

    const telegram_records = await driver
      .model(TelegramModel.tableName)
      .findAll({ where: { id: create_result.telegramUserId } });
    const user_records = await driver
      .model(UserModel.tableName)
      .findAll({ where: { id: create_result.userId } });

    expect(telegram_records.length).toEqual(1);
    expect(user_records.length).toEqual(1);
  });

  test("success: getUser", async () => {
    const telegram_username = "username";
    const telegram_from_user_id = 123;
    const telegram_private_chat_id = 234;

    const create_result = await dao.findOrCreate({
      telegram_from_user_id,
      telegram_username,
      telegram_private_chat_id,
    });

    const user_id = create_result.userId;

    const get_user_result = await dao.getUser({ user_id });

    expect(get_user_result.userId).toEqual(user_id);
    expect(get_user_result.telegramUsername).toEqual(telegram_username);
    expect(get_user_result.telegramPrivateChatId).toEqual(telegram_private_chat_id);
    expect(get_user_result.telegramFromUserId).toEqual(telegram_from_user_id);
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

    const result = [];
    for (const user of users) {
      const create_user_result = await dao.findOrCreate({
        telegram_username: user.telegram_username,
        telegram_private_chat_id: user.telegram_private_chat_id,
        telegram_from_user_id: user.telegram_from_user_id,
      });

      result.push(create_user_result);
    }

    const get_users_result = await dao.getUsers({
      user_ids: result.map((r) => r.userId),
    });

    expect(get_users_result.length).toEqual(2);
  });

  test("success findUserByTelegramUserId", async () => {
    const telegram_username = "samsepiol";
    const telegram_from_user_id = 18904064;

    const user_result = await dao.findOrCreate({
      telegram_from_user_id,
      telegram_username,
    });

    const tg_user_id = user_result.telegramFromUserId;

    const user_id = await dao.findUserByTelegramUserId({
      telegram_from_user_id: tg_user_id,
    });

    expect(user_id.userId).toEqual(user_result.userId);
  });
});
