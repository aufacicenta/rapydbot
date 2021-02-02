import { DataTypes, Model, ModelOptions } from "sequelize";

export class UserModel extends Model<{
  id?: string;
  telegram_user_id: string;
  created_at: Date;
  updated_at: Date;
}> {
  public static tableName = "user";

  public static rawAttributes = {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    telegram_user_id: {
      type: DataTypes.UUID,
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
    tableName: UserModel.tableName,
  };
}
