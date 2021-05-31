import { DataTypes, Model, ModelOptions } from "sequelize";

export class WalletModel extends Model<{
  id?: string;
  user_id: string;
  rapyd_e_wallet: string;
}> {
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
    rapyd_e_wallet: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    rapyd_e_wallet_reference: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    wallet_type: {
      type: DataTypes.TEXT,
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
