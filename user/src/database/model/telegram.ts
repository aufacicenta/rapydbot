import { DataTypes, Model, ModelOptions } from "sequelize";

export type TelegramModelArgs = {
  id?: string;
  user_id: string;
  from_user_id: number;
  username: string;
  private_chat_id: number;
};

export class TelegramModel extends Model<TelegramModelArgs> {
  public static tableName = "telegram";

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
    from_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: false,
    },
    private_chat_id: {
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
    tableName: TelegramModel.tableName,
  };
}
