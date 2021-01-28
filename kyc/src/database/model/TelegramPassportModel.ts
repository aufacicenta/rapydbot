import { DataTypes, Model, ModelOptions } from "sequelize";

export class TelegramPassportModel extends Model {
  public static tableName = "telegram_passport";

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
    key_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    base64_encrypted_data: {
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
  };

  public static config: ModelOptions = {
    paranoid: true,
    underscored: true,
    tableName: TelegramPassportModel.tableName,
  };
}
