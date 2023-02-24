import { Sequelize, ModelStatic } from "sequelize";

import { CreateCampaignUserRequest, CreateCampaignUserReply } from "../client";

import { CampaignUserModel } from "./model/campaign-user";

export class CampaignUser {
  private driver: Sequelize;
  private model: ModelStatic<CampaignUserModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(CampaignUserModel.tableName);
  }

  async create({
    campaignId: campaign_id,
    userId: user_id,
    messageId: message_id,
  }: CreateCampaignUserRequest.AsObject): Promise<CreateCampaignUserReply.AsObject> {
    await this.model.create({
      campaign_id,
      user_id,
      message_id,
    });

    return {
      campaignId: campaign_id,
      userId: user_id,
      messageId: message_id,
    };
  }
}
