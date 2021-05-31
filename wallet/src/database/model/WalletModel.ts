import { DataTypes, Model, ModelOptions } from "sequelize";

export type WalletModelAttributes = {
  id?: string;
  user_id: string;
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
