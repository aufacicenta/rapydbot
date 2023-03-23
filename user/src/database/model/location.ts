import { DataTypes, Model, ModelOptions } from "sequelize";

import { UserModel } from "./user";

export type UserLocationModelAttributes = {
  id?: string;
  user_id: string;
  latitude: number;
  longitude: number;
  created_at: Date;
  updated_at: Date;
  user?: UserModel;
};

export class UserLocationModel extends Model<UserLocationModelAttributes> {
  public static tableName = "user_location";
  public static alias = "location";

  public static rawAttributes = {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    longitude: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
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
    tableName: UserLocationModel.tableName,
  };
}
