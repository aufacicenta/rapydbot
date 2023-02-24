import { Sequelize, ModelStatic } from "sequelize";

import { CreateCampaignReply } from "../client";

import { CampaignModel } from "./model";

export class Campaign {
  private driver: Sequelize;
  private model: ModelStatic<CampaignModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(CampaignModel.tableName);
  }

  async create({
    user_id,
    message_id,
  }: {
    user_id: string;
    message_id: string;
  }): Promise<CreateCampaignReply.AsObject> {
    const result = await this.model.create({
      user_id,
      message_id,
    });

    const campaignId = result.getDataValue("id");

    return {
      campaignId,
    };
  }
}
