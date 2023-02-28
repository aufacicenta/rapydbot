import { Sequelize, SyncOptions } from "sequelize";

import { CampaignActionModel, CampaignModel } from "./model";
import { CampaignUserModel } from "./model/campaign-user";

export default {
  async connect(options?: SyncOptions) {
    try {
      const sequelize = new Sequelize(process.env.MYSQL_URL, {
        dialect: "postgres",
      });

      const Campaign = sequelize.define(
        CampaignModel.tableName,
        CampaignModel.rawAttributes,
        CampaignModel.config,
      );

      const CampaignActions = sequelize.define(
        CampaignActionModel.tableName,
        CampaignActionModel.rawAttributes,
        CampaignActionModel.config,
      );

      const CampaignUser = sequelize.define(
        CampaignUserModel.tableName,
        CampaignUserModel.rawAttributes,
        CampaignUserModel.config,
      );

      Campaign.hasMany(CampaignActions, {
        foreignKey: { allowNull: true },
      });

      CampaignActions.belongsTo(Campaign, {
        foreignKey: { allowNull: true },
      });

      CampaignUser.belongsTo(Campaign, {
        foreignKey: { allowNull: true },
      });

      await sequelize.authenticate();

      await sequelize.sync(options);

      console.log("Database Connection success");

      return sequelize;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
