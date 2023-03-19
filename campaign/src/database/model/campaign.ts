import { DataTypes, Model, ModelOptions } from "sequelize";

import { CampaignActionModel } from "./campaign-action";

export type CampaignModelArgs = {
  id?: string;
  issuer_id: string;
  bounds?: string;
  created_at: Date;
  updated_at: Date;
  closed_at: Date;
  published_at: Date;
  actions: CampaignActionModel;
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
    issuer_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    bounds: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment:
        "Stores the bounds of the campaign in the form of a polygon to be read by ST_GeomFromText('POLYGON((x1 y1, x2 y2,...))')",
    },
    closed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    published_at: {
      type: DataTypes.DATE,
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
  };

  public static config: ModelOptions = {
    paranoid: true,
    underscored: true,
    tableName: CampaignModel.tableName,
  };
}
