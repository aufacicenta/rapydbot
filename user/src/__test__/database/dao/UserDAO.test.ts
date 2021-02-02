import { Sequelize } from "sequelize/types";
import database from "../../../database";
import { UserDAO } from "../../../database/dao/UserDAO";
import { TelegramModel } from "../../../database/model/TelegramModel";
import { UserModel } from "../../../database/model/UserModel";

let driver: Sequelize, dao: UserDAO;

describe("database:dao:user", () => {
  beforeEach(async () => {
    driver = await database.connect({ force: true });
    dao = new UserDAO(driver);
  });

  test("success: findUserByTelegramUserIdOrCreateUser", async () => {
    const telegram_username = "username";
    const telegram_from_user_id = 123;

    const create_result = await dao.findUserByTelegramUserIdOrCreateUser({
      telegram_from_user_id,
      telegram_username,
    });

    expect(create_result.telegramUsername).toEqual(telegram_username);
    expect(create_result.telegramFromUserId).toEqual(telegram_from_user_id);
    expect(create_result.telegramUserId).toBeTruthy();
    expect(create_result.telegramPrivateChatId).toBeUndefined();
    expect(create_result.userId).toBeTruthy();

    const telegram_private_chat_id = 234;

    const update_result = await dao.findUserByTelegramUserIdOrCreateUser({
      telegram_from_user_id,
      telegram_username,
      telegram_private_chat_id,
    });

    expect(update_result.telegramPrivateChatId).toEqual(
      telegram_private_chat_id
    );

    const telegram_records = await driver
      .model(TelegramModel.tableName)
      .findAll({ where: { id: create_result.telegramUserId } });
    const user_records = await driver
      .model(UserModel.tableName)
      .findAll({ where: { id: create_result.userId } });

    expect(telegram_records.length).toEqual(1);
    expect(user_records.length).toEqual(1);
  });
});
