import { UserClient } from "../server/protos/schema_grpc_pb";
import {
  GetUsersByLocationBoundsRequest,
  GetUsersByLocationBoundsReply,
} from "../server/protos/schema_pb";

export const getUsersByLocationBounds = (
  client: UserClient,
  { bounds }: GetUsersByLocationBoundsRequest.AsObject,
): Promise<GetUsersByLocationBoundsReply.AsObject[]> => {
  const request = new GetUsersByLocationBoundsRequest();

  request.setBounds(bounds);

  return new Promise((resolve) => {
    const call = client.getUsersByLocationBounds(request);

    const response: Array<GetUsersByLocationBoundsReply.AsObject> = [];

    call.on("data", (data: GetUsersByLocationBoundsReply) => {
      response.push(data.toObject());
    });

    call.on("end", () => {
      resolve(response);
    });
  });
};
