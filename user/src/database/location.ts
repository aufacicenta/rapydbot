import { ModelStatic, Sequelize } from "sequelize";

import { CreateUserLocationReply, CreateUserLocationRequest } from "../server/protos/schema_pb";
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
}
