import { Association, DataTypes, Model, ModelOptions, NonAttribute } from "sequelize";

import { UserLocationModel } from "./location";
import { TelegramModel } from "./telegram";

export type UserModelAttributes = {
  id?: string;
  telegram_id: string;
  location_id: string;
  created_at: Date;
  updated_at: Date;
  telegram?: TelegramModel;
  user_location?: UserLocationModel;
};

export class UserModel extends Model<UserModelAttributes> {
  declare static associations: {
    telegram: Association<UserModel, TelegramModel>;
  };

  public static tableName = "user";

  public static rawAttributes = {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    telegram_id: {
      type: DataTypes.UUID,
      allowNull: true,
      unique: true,
    },
    location_id: {
      type: DataTypes.UUID,
      allowNull: true,
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
    tableName: UserModel.tableName,
  };

  declare telegram?: NonAttribute<TelegramModel>;
}
