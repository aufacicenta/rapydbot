import { UserClient } from "../server/protos/schema_grpc_pb";
import { GetUsersRequest, GetUserReply } from "../server/protos/schema_pb";

export const getUsers = (
  client: UserClient,
  { userIdList }: GetUsersRequest.AsObject,
): Promise<GetUserReply.AsObject[]> => {
  const request = new GetUsersRequest();

  request.setUserIdList(userIdList);

  return new Promise((resolve) => {
    const call = client.getUsers(request);

    const response: Array<GetUserReply.AsObject> = [];

    call.on("data", (data: GetUserReply) => {
      response.push(data.toObject());
    });

    call.on("end", () => {
      resolve(response);
    });
  });
};
