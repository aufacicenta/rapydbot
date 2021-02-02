import { ModelCtor, Sequelize } from "sequelize";
import { CreateUserReply } from "../../server/protos/schema_pb";
import { TelegramModel } from "../model/TelegramModel";
import { UserModel } from "../model/UserModel";

export class UserDAO {
  private driver: Sequelize;
  private user: ModelCtor<UserModel>;
  private telegram: ModelCtor<TelegramModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.user = driver.model(UserModel.tableName);
    this.telegram = driver.model(TelegramModel.tableName);
  }

  async findUserByTelegramUserIdOrCreateUser({
    telegram_from_user_id,
    telegram_username,
    telegram_private_chat_id = null,
  }: {
    telegram_from_user_id: number;
    telegram_username: string;
    telegram_private_chat_id?: number;
  }): Promise<CreateUserReply.AsObject> {
    const [telegram_result] = await this.telegram.findOrCreate({
      where: {
        from_user_id: telegram_from_user_id,
        username: telegram_username,
      },
    });

    if (Boolean(telegram_private_chat_id)) {
      telegram_result.set("private_chat_id", telegram_private_chat_id);
      await telegram_result.save();
    }

    if (!Boolean(telegram_result.getDataValue("id"))) {
      throw new Error("findUserByTelegramUserIdOrCreateUser failed");
    }

    const [user_result] = await this.user.findOrCreate({
      where: { telegram_id: telegram_result.getDataValue("id") },
    });

    if (!Boolean(user_result.getDataValue("id"))) {
      throw new Error("findUserByTelegramUserIdOrCreateUser failed");
    }

    return {
      userId: user_result.getDataValue("id"),
      telegramUserId: user_result.getDataValue("telegram_id"),
      telegramFromUserId: telegram_result.getDataValue("from_user_id"),
      telegramUsername: telegram_result.getDataValue("username"),
      telegramPrivateChatId: telegram_result.getDataValue("private_chat_id"),
    };
  }
}
