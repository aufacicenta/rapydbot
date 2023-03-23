import { Sequelize, SyncOptions } from "sequelize";

import { CampaignActionMessageModel, CampaignActionModel, CampaignModel } from "./model";

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

      const CampaignAction = sequelize.define(
        CampaignActionModel.tableName,
        CampaignActionModel.rawAttributes,
        CampaignActionModel.config,
      );

      const CampaignActionMessage = sequelize.define(
        CampaignActionMessageModel.tableName,
        CampaignActionMessageModel.rawAttributes,
        CampaignActionMessageModel.config,
      );

      Campaign.hasMany(CampaignAction, {
        foreignKey: { allowNull: true },
      });

      CampaignAction.belongsTo(Campaign, {
        foreignKey: { allowNull: true },
      });

      CampaignActionMessage.belongsTo(CampaignAction, {
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
