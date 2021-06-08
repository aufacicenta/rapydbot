import { DataTypes, Model, ModelOptions } from "sequelize";

export type WalletModelAttributes = {
  id?: string;
  user_id: string;
  rapyd_ewallet_address: string;
  rapyd_ewallet_currency_code?: string;
  rapyd_ewallet_country_code?: string;
};

export class WalletModel extends Model<WalletModelAttributes> {
  public static tableName = "wallet";

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
    },
    rapyd_ewallet_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rapyd_ewallet_currency_code: {
      type: DataTypes.STRING,
    },
    rapyd_ewallet_country_code: {
      type: DataTypes.STRING,
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
    tableName: WalletModel.tableName,
  };
}
