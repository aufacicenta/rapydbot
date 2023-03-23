import { ModelStatic, QueryTypes, Sequelize } from "sequelize";

import {
  CreateUserLocationReply,
  CreateUserLocationRequest,
  GetUsersByLocationBoundsReply,
  GetUsersByLocationBoundsRequest,
} from "../server/protos/schema_pb";
import { UserServiceErrorCodes } from "../service/error";

import { UserLocationModel } from "./model";

export class Location {
  private driver: Sequelize;
  private model: ModelStatic<UserLocationModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.model = driver.model(UserLocationModel.tableName);
  }

  async create({
    latitude,
    longitude,
    userId: user_id,
  }: CreateUserLocationRequest.AsObject): Promise<CreateUserLocationReply.AsObject> {
    const result = await this.model.create({
      latitude,
      longitude,
      user_id,
    });

    if (!result) {
      throw new Error(UserServiceErrorCodes.user_location_not_created);
    }

    return {
      locationId: result.getDataValue("id"),
      userId: result.getDataValue("user_id"),
      latitude: result.getDataValue("latitude"),
      longitude: result.getDataValue("longitude"),
    };
  }

  async findAndCountAll(): Promise<CreateUserLocationReply.AsObject[]> {
    const result = await this.model.findAndCountAll();

    if (!result) {
      throw new Error(UserServiceErrorCodes.user_location_find_and_count_all_failed);
    }

    return result.rows.map((row) => ({
      locationId: row.getDataValue("id"),
      userId: row.getDataValue("user_id"),
      latitude: row.getDataValue("latitude"),
      longitude: row.getDataValue("longitude"),
    }));
  }

  async getByBounds({
    bounds,
  }: GetUsersByLocationBoundsRequest.AsObject): Promise<
    GetUsersByLocationBoundsReply.AsObject[]
  > {
    const result = await this.driver.query(
      `SELECT * FROM ${this.model.tableName} as ul WHERE ST_Intersects(
  ST_GeometryFromText('POLYGON((${bounds}))', 4326),
  ST_GeometryFromText(CONCAT('POINT(', ul.longitude, ' ', ul.latitude, ')'), 4326)) = true;`,
      {
        model: this.model,
        type: QueryTypes.SELECT,
      },
    );

    if (!result) {
      throw new Error(UserServiceErrorCodes.user_location_get_by_bounds_failed);
    }

    return result.map((row) => ({
      latitude: row.getDataValue("latitude"),
      longitude: row.getDataValue("longitude"),
    }));
  }
}
