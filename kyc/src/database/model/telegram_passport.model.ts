import { DataTypes, ModelAttributes, ModelOptions } from "sequelize";

export class TelegramPassport {
  public static table_name = "telegram_passport";

  public static config: ModelOptions = {
    paranoid: true,
    underscored: true,
    tableName: TelegramPassport.table_name,
  };

  public static model: ModelAttributes = {
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
}
