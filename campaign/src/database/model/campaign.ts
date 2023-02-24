import { DataTypes, Model, ModelOptions } from "sequelize";

import { CampaignActionsModel } from "./campaign-actions";

export type CampaignModelArgs = {
  id?: string;
  user_id: string;
  message_id: string;
  created_at: Date;
  updated_at: Date;
  closed_at: Date;
  actions: CampaignActionsModel;
};

export class CampaignModel extends Model<CampaignModelArgs> {
  public static tableName = "campaign";

  public static rawAttributes = {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    message_id: {
      type: DataTypes.UUID,
      allowNull: true,
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
    closed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  };

  public static config: ModelOptions = {
    paranoid: true,
    underscored: true,
    tableName: CampaignModel.tableName,
  };
}
