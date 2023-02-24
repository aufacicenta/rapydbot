import { Sequelize, ModelStatic } from "sequelize";

import { CreateCampaignActionReply } from "../client";

import { CampaignActionModel, CampaignActionModelArgs } from "./model";

export class CampaignAction {
  private driver: Sequelize;
  private model: ModelStatic<CampaignActionModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(CampaignActionModel.tableName);
  }

  async create(args: CampaignActionModelArgs): Promise<CreateCampaignActionReply.AsObject> {
    const result = await this.model.create(args);

    const campaignActionId = result.getDataValue("id");

    return {
      campaignActionId,
    };
  }
}
