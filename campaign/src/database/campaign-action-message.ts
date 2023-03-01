import { Sequelize, ModelStatic } from "sequelize";

import { CreateCampaignActionMessageReply } from "../client";

import { CampaignActionMessageModel, CampaignActionMessageModelArgs } from "./model";

export class CampaignActionMessage {
  private driver: Sequelize;
  private model: ModelStatic<CampaignActionMessageModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(CampaignActionMessageModel.tableName);
  }

  async create(
    args: CampaignActionMessageModelArgs,
  ): Promise<CreateCampaignActionMessageReply.AsObject> {
    const result = await this.model.create(args);

    const id = result.getDataValue("id");

    return {
      id,
    };
  }
}
