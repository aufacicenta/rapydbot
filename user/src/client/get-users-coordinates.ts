import { UserClient } from "../server/protos/schema_grpc_pb";
import { GetUsersCoordinatesReply, GetUsersCoordinatesRequest } from "../server/protos/schema_pb";

export const getUsersCoordinates = (
  client: UserClient,
): Promise<GetUsersCoordinatesReply.AsObject[]> => {
  const request = new GetUsersCoordinatesRequest();

  return new Promise((resolve) => {
    const call = client.getUsersCoordinates(request);

    const response: Array<GetUsersCoordinatesReply.AsObject> = [];

    call.on("data", (data: GetUsersCoordinatesReply) => {
      response.push(data.toObject());
    });

    call.on("end", () => {
      resolve(response);
    });
  });
};
