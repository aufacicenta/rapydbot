import { DataTypes, Model, ModelOptions } from "sequelize";

import { CampaignModel } from "./campaign";

export type CampaignActionModelArgs = {
  id?: string;
  campaign_id: string;
  initial_instruction: string;
  reply: string;
  intent_action: string;
  campaign?: CampaignModel;
};

export class CampaignActionModel extends Model<CampaignActionModelArgs> {
  public static tableName = "campaign_action";

  public static rawAttributes = {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    campaign_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    initial_instruction: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "An html formatted instruction sent once upon each campaign action",
    },
    reply: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment:
        "An html formatted reply that the bot will reply with during the instruction period",
    },
    intent_action: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "a single string label to map an IntentAction enum item",
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
  };

  public static config: ModelOptions = {
    paranoid: true,
    underscored: true,
    tableName: CampaignActionModel.tableName,
  };
}
