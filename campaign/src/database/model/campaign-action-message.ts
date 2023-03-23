import { DataTypes, Model, ModelOptions } from "sequelize";

import { CampaignActionModel } from "./campaign-action";

export type CampaignActionMessageModelArgs = {
  id?: string;
  campaign_action_id: string;
  user_id: string;
  message: string;
  // @TODO approved_by
  approved_at?: string;
  campaign_action?: CampaignActionModel;
};

export class CampaignActionMessageModel extends Model<CampaignActionMessageModelArgs> {
  public static tableName = "campaign_action_message";

  public static rawAttributes = {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    campaign_action_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    approved_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  };

  public static config: ModelOptions = {
    paranoid: true,
    underscored: true,
    tableName: CampaignActionMessageModel.tableName,
  };
}
