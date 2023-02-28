import { Sequelize } from "sequelize";

import { Campaign } from "../../database/campaign";
import { CampaignAction } from "../../database/campaign-action";
import { CampaignUser } from "../../database/campaign-user";
import { Controller } from "../../service/controller";

export type IContext = {
  controller: Controller;
  db: {
    driver: Sequelize;
    campaign: Campaign;
    campaignActions: CampaignAction;
    campaignUser: CampaignUser;
  };
};
