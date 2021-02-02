import { DataTypes, Model, ModelOptions } from "sequelize";

export class TelegramUserModel extends Model<{
  id?: string;
  user_id: string;
  telegram_from_user_id: number;
  telegram_username: string;
  telegram_private_chat_id: number;
}> {
  public static tableName = "telegram_user";

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
    telegram_from_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    telegram_username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: false,
    },
    telegram_private_chat_id: {
      type: DataTypes.INTEGER,
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
    tableName: TelegramUserModel.tableName,
  };
}
