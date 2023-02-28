import { Sequelize, ModelStatic } from "sequelize";

import { CreateCampaignActionReply, GetCampaignActionsReply } from "../client";
import { CampaignServiceErrorCodes } from "../service/error";

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

  async getByCampaignId({
    campaignId: campaign_id,
  }: {
    campaignId: CampaignActionModelArgs["campaign_id"];
  }): Promise<Array<GetCampaignActionsReply.AsObject>> {
    const result = await this.model.findAll({
      where: {
        campaign_id,
      },
      order: [["created_at", "ASC"]],
    });

    if (result.length === 0) {
      throw new Error(CampaignServiceErrorCodes.campaign_actions_get_by_campaign_id_empty);
    }

    return result.map((action) => ({
      campaignId: action.getDataValue("campaign_id"),
      initialInstruction: action.getDataValue("initial_instruction"),
      intentAction: action.getDataValue("intent_action"),
      reply: action.getDataValue("reply"),
    }));
  }
}
