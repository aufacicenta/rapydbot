import { ModelCtor, Sequelize } from "sequelize";
import { CreateUserReply } from "../../server/protos/schema_pb";
import { TelegramUserModel } from "../model/TelegramUserModel";
import { UserModel } from "../model/UserModel";

export class UserDAO {
  private driver: Sequelize;
  private user: ModelCtor<UserModel>;
  private telegram_user: ModelCtor<TelegramUserModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.user = driver.model(UserModel.tableName);
    this.telegram_user = driver.model(TelegramUserModel.tableName);
  }

  async findUserByTelegramUserIdOrCreateUser({
    telegram_from_user_id,
  }: {
    telegram_from_user_id: number;
  }): Promise<CreateUserReply.AsObject> {
    const [telegram_user] = await this.telegram_user.findOrCreate({
      where: { telegram_from_user_id },
    });

    if (!Boolean(telegram_user.getDataValue("id"))) {
      throw new Error("findUserByTelegramUserIdOrCreateUser failed");
    }

    const [user] = await this.user.findOrCreate({
      where: { telegram_user_id: telegram_user.getDataValue("id") },
    });

    if (!Boolean(user.getDataValue("id"))) {
      throw new Error("findUserByTelegramUserIdOrCreateUser failed");
    }

    return {
      id: user.getDataValue("id"),
      telegramUserId: user.getDataValue("telegram_user_id"),
      telegramFromUserId: telegram_user.getDataValue("telegram_from_user_id"),
      telegramUsername: telegram_user.getDataValue("telegram_username"),
      telegramPrivateChatId: telegram_user.getDataValue(
        "telegram_private_chat_id"
      ),
    };
  }
}
