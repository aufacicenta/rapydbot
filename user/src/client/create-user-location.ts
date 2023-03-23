import { UserClient } from "../server/protos/schema_grpc_pb";
import { CreateUserLocationRequest, CreateUserLocationReply } from "../server/protos/schema_pb";

export const createUserLocation = (
  client: UserClient,
  { userId, longitude, latitude }: CreateUserLocationRequest.AsObject,
): Promise<CreateUserLocationReply.AsObject> => {
  const request = new CreateUserLocationRequest();

  request.setUserId(userId);
  request.setLongitude(longitude);
  request.setLatitude(latitude);

  return new Promise((resolve, reject) => {
    client.createUserLocation(request, (error, reply) => {
      if (Boolean(error)) {
        return reject(error);
      }

      const userId = reply.getUserId();
      const longitude = reply.getLongitude();
      const latitude = reply.getLatitude();
      const locationId = reply.getLocationId();

      resolve({
        locationId,
        userId,
        longitude,
        latitude,
      });
    });
  });
};
