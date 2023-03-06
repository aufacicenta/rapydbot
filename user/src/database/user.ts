import { ModelStatic, Sequelize } from "sequelize";

import {
  CreateUserReply,
  GetUserReply,
  GetUserTelegramChatIdRequest,
} from "../server/protos/schema_pb";
import { UserServiceErrorCodes } from "../service/error";

import { TelegramModel } from "./model/telegram";
import { UserModel, UserModelAttributes } from "./model/user";

export class User {
  private driver: Sequelize;
  private model: ModelStatic<UserModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(UserModel.tableName);
  }

  async setLocationId({
    id,
    location_id,
  }: Pick<UserModelAttributes, "id" | "location_id">): Promise<number[]> {
    const result = await this.model.update(
      {
        location_id,
      },
      { where: { id } },
    );

    if (!result) {
      throw new Error(UserServiceErrorCodes.user_location_not_updated);
    }

    return result;
  }

  async findOrCreate({
    telegram_id,
  }: Pick<UserModelAttributes, "telegram_id">): Promise<
    Pick<CreateUserReply.AsObject, "userId">
  > {
    const [result] = await this.model.findOrCreate({
      where: { telegram_id },
    });

    const userId = result.getDataValue("id");

    if (!userId) {
      throw new Error(UserServiceErrorCodes.user_record_not_created);
    }

    return {
      userId,
    };
  }

  async getUser({ user_id }: { user_id: string }): Promise<GetUserReply.AsObject> {
    const result = await this.model.findOne({
      where: { id: user_id },
      include: TelegramModel.tableName,
    });

    if (!result) {
      throw new Error("getUser failed");
    }

    return this.getUserReplyObject(result);
  }

  async getUsers({
    user_ids,
  }: {
    user_ids: Array<string>;
  }): Promise<Array<GetUserReply.AsObject>> {
    const result = await this.model.findAll({
      where: {
        id: user_ids,
      },
      include: TelegramModel.tableName,
    });

    if (!result) {
      throw new Error(UserServiceErrorCodes.users_not_found);
    }

    return result.map((r) => this.getUserReplyObject(r));
  }

  async getUserTelegramChatId({ userId }: Pick<GetUserTelegramChatIdRequest.AsObject, "userId">) {
    const user = await this.model.findOne({
      where: { id: userId },
      include: TelegramModel.tableName,
    });

    if (!user) {
      throw new Error(UserServiceErrorCodes.user_not_found);
    }

    const telegramInfo = user.getDataValue("telegram");

    if (!telegramInfo) {
      throw new Error(UserServiceErrorCodes.user_telegram_info_not_found);
    }

    return telegramInfo.getDataValue("private_chat_id");
  }

  private getUserReplyObject(user: UserModel): GetUserReply.AsObject {
    const tg = user.telegram;

    return {
      userId: user.getDataValue("id"),
      telegramUserId: user.getDataValue("telegram_id"),
      telegramFromUserId: tg.getDataValue("from_user_id"),
      telegramUsername: tg.getDataValue("username"),
      telegramPrivateChatId: tg.getDataValue("private_chat_id"),
    };
  }
}
