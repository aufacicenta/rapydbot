import { QueryResolvers } from "api/codegen/resolvers-types";
import { getUsersCoordinates } from "@rapydbot/user";
import { ResolversContext } from "api/graphql";

export const getUsersCoordinatesResolver: QueryResolvers["getUsersCoordinates"] = async (
  _parent,
  _args,
  context: ResolversContext,
) => {
  const result = await getUsersCoordinates(context.clients.user);

  return result;
};
