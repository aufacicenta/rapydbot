import { Sequelize } from "sequelize";

import { Campaign } from "../../database/campaign";
import { CampaignActions } from "../../database/campaign-actions";
import { Controller } from "../../service/controller";

export type IContext = {
  controller: Controller;
  db: {
    driver: Sequelize;
    campaign: Campaign;
    campaignActions: CampaignActions;
  };
};
