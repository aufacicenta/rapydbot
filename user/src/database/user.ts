import { ModelCtor, Sequelize } from "sequelize";
import {
  CreateUserReply,
  FindUserByTelegramUserIdReply,
  GetUserIdByTelegramUsernameReply,
  GetUserReply,
  GetUserTelegramChatIdRequest,
} from "../server/protos/schema_pb";
import { UserServiceErrorCodes } from "../service/error";
import { TelegramModel, TelegramModelArgs } from "./model/telegram";
import { UserModel } from "./model/user";

export class User {
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

    const telegram_id = telegram_result.getDataValue("id");

    if (!Boolean(telegram_id)) {
      throw new Error("findUserByTelegramUserIdOrCreateUser failed");
    }

    const [user_result] = await this.user.findOrCreate({
      where: { telegram_id },
    });

    const userId = user_result.getDataValue("id");

    if (!Boolean(userId)) {
      throw new Error("findUserByTelegramUserIdOrCreateUser failed");
    }

    telegram_result.set("user_id", userId);
    await telegram_result.save();

    return {
      userId,
      telegramUserId: user_result.getDataValue("telegram_id"),
      telegramFromUserId: telegram_result.getDataValue("from_user_id"),
      telegramUsername: telegram_result.getDataValue("username"),
      telegramPrivateChatId: telegram_result.getDataValue("private_chat_id"),
    };
  }

  async findUserByTelegramUserId({
    telegram_from_user_id,
  }: {
    telegram_from_user_id: number;
  }): Promise<FindUserByTelegramUserIdReply.AsObject> {
    const telegram_result = await this.telegram.findOne({
      where: {
        from_user_id: telegram_from_user_id,
      },
    });

    const telegram_id = telegram_result.getDataValue("id");

    if (!Boolean(telegram_id)) {
      throw new Error("findUserByTelegramUserIdOrCreateUser failed");
    }

    const userId = telegram_result.getDataValue("user_id");

    if (!Boolean(userId)) {
      throw new Error("findUserByTelegramUserIdOrCreateUser failed");
    }

    return {
      userId,
    };
  }

  async findUserByTelegramUsername({
    username,
  }: Pick<TelegramModelArgs, "username">): Promise<GetUserIdByTelegramUsernameReply.AsObject> {
    const telegram_result = await this.telegram.findOne({
      where: {
        username,
      },
    });

    if (!Boolean(telegram_result)) {
      throw new Error(UserServiceErrorCodes.telegram_username_not_found);
    }

    const userId = telegram_result.getDataValue("user_id");

    if (!Boolean(userId)) {
      throw new Error(UserServiceErrorCodes.telegram_username_not_found);
    }

    return {
      userId,
    };
  }

  async getUser({ user_id }: { user_id: string }): Promise<GetUserReply.AsObject> {
    const result = await this.user.findOne({
      where: { id: user_id },
      include: {
        model: this.telegram,
      },
    });

    if (!Boolean(result)) {
      throw new Error("getUser failed");
    }

    return this.getUserReplyObject(result);
  }

  async getUsers({
    user_ids,
  }: {
    user_ids: Array<string>;
  }): Promise<Array<GetUserReply.AsObject>> {
    const result = await this.user.findAll({
      where: {
        id: user_ids,
      },
      include: {
        model: this.telegram,
      },
    });

    if (!Boolean(result)) {
      throw new Error("getUsers failed");
    }

    return result.map((r) => this.getUserReplyObject(r));
  }

  async getUserTelegramChatId({ userId }: Pick<GetUserTelegramChatIdRequest.AsObject, "userId">) {
    const user = await this.user.findOne({
      where: { id: userId },
      include: {
        model: this.telegram,
      },
    });

    if (!Boolean(user)) {
      throw new Error(UserServiceErrorCodes.user_not_found);
    }

    const telegramInfo = user.getDataValue("telegram");

    if (!Boolean(telegramInfo)) {
      throw new Error(UserServiceErrorCodes.user_telegram_info_not_found);
    }

    return telegramInfo.getDataValue("private_chat_id");
  }

  private getUserReplyObject(user: UserModel): GetUserReply.AsObject {
    const tg = user.getDataValue("telegram");

    return {
      userId: user.getDataValue("id"),
      telegramUserId: user.getDataValue("telegram_id"),
      telegramFromUserId: tg.getDataValue("from_user_id"),
      telegramUsername: tg.getDataValue("username"),
      telegramPrivateChatId: tg.getDataValue("private_chat_id"),
    };
  }
}
