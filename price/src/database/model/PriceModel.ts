import { DataTypes, Model, ModelOptions } from "sequelize";

export class PriceModel extends Model<{
  price: number;
  from_currency: string;
  id?: string;
  to_currency?: string;
}> {
  public static tableName = "price";

  public static rawAttributes = {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    from_currency: {
      type: DataTypes.STRING,
      length: 3,
      allowNull: true,
    },
    to_currency: {
      type: DataTypes.STRING,
      length: 3,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
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
    tableName: PriceModel.tableName,
  };
}
