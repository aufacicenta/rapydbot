import { Sequelize, ModelStatic } from "sequelize";

import { CreateCampaignActionMessageReply, GetCampaignActionMessagesReply } from "../client";

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

  async getByCampaignActionId({
    campaign_action_id,
  }: Pick<CampaignActionMessageModelArgs, "campaign_action_id">): Promise<
    Array<GetCampaignActionMessagesReply.AsObject>
  > {
    const result = await this.model.findAll({
      where: {
        campaign_action_id,
      },
    });

    return result.map((message) => ({
      id: message.getDataValue("id"),
      campaignActionId: message.getDataValue("campaign_action_id"),
      userId: message.getDataValue("user_id"),
      message: message.getDataValue("message"),
      approvedAt: message.getDataValue("approved_at"),
    }));
  }
}
