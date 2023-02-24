import { DataTypes, Model, ModelOptions } from "sequelize";

import { CampaignModel } from "./campaign";

export type CampaignUserModelArgs = {
  campaign_id: string;
  user_id: string;
  message_id: string;
  created_at: Date;
  updated_at: Date;
  campaign: CampaignModel;
};

export class CampaignUserModel extends Model<CampaignUserModelArgs> {
  public static tableName = "campaign_user";

  public static rawAttributes = {
    campaign_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      comment:
        "user_id from the user microservice. should resolve to a telegram, or another channel user id.",
    },
    message_id: {
      type: DataTypes.UUID,
      allowNull: false,
      comment:
        "the message id from the bot.context.chat record that follows this campaign thread",
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
    tableName: CampaignUserModel.tableName,
  };
}
