import { DataTypes, Model, ModelOptions } from "sequelize";

export type OrderModelAttributes = {
  user_id: string;
  price_id: string;
  amount: number;
  from_currency: string;
  expires_at: string;
  type: "sell" | "buy";
  id?: string;
  to_currency?: string;
};

export class OrderModel extends Model<OrderModelAttributes> {
  public static tableName = "order";

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
    price_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      isIn: [["sell", "buy"]],
    },
    from_currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to_currency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
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
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  };

  public static config: ModelOptions = {
    paranoid: true,
    underscored: true,
    tableName: OrderModel.tableName,
  };
}
