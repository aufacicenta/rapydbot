import { Sequelize, ModelStatic } from "sequelize";

import { CreateCampaignReply, CreateCampaignRequest } from "../client";

import { CampaignModel } from "./model";

export class Campaign {
  private driver: Sequelize;
  private model: ModelStatic<CampaignModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(CampaignModel.tableName);
  }

  async create({
    issuerId: issuer_id,
  }: CreateCampaignRequest.AsObject): Promise<CreateCampaignReply.AsObject> {
    const result = await this.model.create({
      issuer_id,
    });

    const campaignId = result.getDataValue("id");

    return {
      campaignId,
    };
  }
}
