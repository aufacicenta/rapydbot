import { Sequelize, ModelStatic } from "sequelize";

import { CreateCampaignActionReply } from "../client";

import { CampaignActionsModel, CampaignActionsModelArgs } from "./model";

export class CampaignActions {
  private driver: Sequelize;
  private model: ModelStatic<CampaignActionsModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(CampaignActionsModel.tableName);
  }

  async create(args: CampaignActionsModelArgs): Promise<CreateCampaignActionReply.AsObject> {
    const result = await this.model.create(args);

    const campaignActionId = result.getDataValue("id");

    return {
      campaignActionId,
    };
  }
}
