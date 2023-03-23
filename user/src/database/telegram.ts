import { ModelStatic, Sequelize } from "sequelize";

import {
  CreateUserReply,
  CreateUserRequest,
  FindUserByTelegramUserIdReply,
  GetUserIdByTelegramUsernameReply,
} from "../server/protos/schema_pb";
import { UserServiceErrorCodes } from "../service/error";

import { TelegramModel, TelegramModelArgs } from "./model/telegram";

export class Telegram {
  private driver: Sequelize;
  private model: ModelStatic<TelegramModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(TelegramModel.tableName);
  }

  async update({ id, user_id }: Pick<TelegramModelArgs, "user_id" | "id">): Promise<number[]> {
    const result = await this.model.update(
      {
        user_id,
      },
      { where: { id } },
    );

    if (!result) {
      throw new Error(UserServiceErrorCodes.telegram_record_not_updated);
    }

    return result;
  }

  async findOrCreate({
    telegramFromUserId: telegram_from_user_id,
    telegramUsername: telegram_username,
    telegramPrivateChatId: telegram_private_chat_id = null,
  }: CreateUserRequest.AsObject): Promise<
    Pick<
      CreateUserReply.AsObject,
      "telegramFromUserId" | "telegramPrivateChatId" | "telegramUserId" | "telegramUsername"
    >
  > {
    const [result] = await this.model.findOrCreate({
      where: {
        from_user_id: telegram_from_user_id,
        username: telegram_username,
      },
    });

    if (telegram_private_chat_id) {
      result.set("private_chat_id", telegram_private_chat_id);

      await result.save();
    }

    const telegram_id = result.getDataValue("id");

    if (!telegram_id) {
      throw new Error(UserServiceErrorCodes.telegram_record_not_created);
    }

    return {
      telegramUserId: result.getDataValue("id"),
      telegramFromUserId: result.getDataValue("from_user_id"),
      telegramUsername: result.getDataValue("username"),
      telegramPrivateChatId: result.getDataValue("private_chat_id"),
    };
  }

  async findByUserId({
    telegram_from_user_id,
  }: {
    telegram_from_user_id: number;
  }): Promise<FindUserByTelegramUserIdReply.AsObject> {
    const result = await this.model.findOne({
      where: {
        from_user_id: telegram_from_user_id,
      },
    });

    if (!result) {
      throw new Error(UserServiceErrorCodes.user_not_found);
    }

    const userId = result.getDataValue("user_id");

    return {
      userId,
    };
  }

  async findByUsername({
    username,
  }: Pick<TelegramModelArgs, "username">): Promise<GetUserIdByTelegramUsernameReply.AsObject> {
    const telegram_result = await this.model.findOne({
      where: {
        username,
      },
    });

    if (!telegram_result) {
      throw new Error(UserServiceErrorCodes.telegram_username_not_found);
    }

    const userId = telegram_result.getDataValue("user_id");

    if (!userId) {
      throw new Error(UserServiceErrorCodes.telegram_username_not_found);
    }

    return {
      userId,
    };
  }
}
