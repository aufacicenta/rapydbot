import { Sequelize } from "sequelize";

import { Campaign } from "../../database/campaign";
import { CampaignAction } from "../../database/campaign-action";
import { CampaignActionMessage } from "../../database/campaign-action-message";
import { CampaignUser } from "../../database/campaign-user";
import { Controller } from "../../service/controller";

export type IContext = {
  controller: Controller;
  db: {
    driver: Sequelize;
    campaign: Campaign;
    campaignUser: CampaignUser;
    campaignAction: CampaignAction;
    campaignActionMessage: CampaignActionMessage;
  };
};
