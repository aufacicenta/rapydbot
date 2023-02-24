import { Sequelize, SyncOptions } from "sequelize";

import { CampaignActionsModel, CampaignModel } from "./model";

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
        CampaignActionsModel.tableName,
        CampaignActionsModel.rawAttributes,
        CampaignActionsModel.config,
      );

      Campaign.hasMany(CampaignActions, {
        foreignKey: { allowNull: true },
      });

      CampaignActions.belongsTo(Campaign, {
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
