import { Sequelize, ModelStatic } from "sequelize";

import {
  CreateCampaignReply,
  CreateCampaignRequest,
  SetCampaignBoundsReply,
  SetCampaignBoundsRequest,
} from "../client";
import { CampaignServiceErrorCodes } from "../service/error";

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

  async setBounds({
    campaignId: campaign_id,
    bounds,
  }: SetCampaignBoundsRequest.AsObject): Promise<SetCampaignBoundsReply.AsObject> {
    const result = await this.model.update(
      {
        bounds,
      },
      {
        where: {
          id: campaign_id,
        },
      },
    );

    if (result[0] === 0) {
      throw new Error(CampaignServiceErrorCodes.campaign_bounds_not_set);
    }

    return {
      campaignId: campaign_id,
      bounds,
    };
  }
}
