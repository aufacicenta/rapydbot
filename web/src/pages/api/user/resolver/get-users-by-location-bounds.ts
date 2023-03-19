import { QueryResolvers } from "api/codegen/resolvers-types";
import { getUsersByLocationBounds } from "@rapydbot/user";
import { ResolversContext } from "api/graphql";

export const getUsersByLocationBoundsResolver: QueryResolvers["getUsersByLocationBounds"] = async (
  _parent,
  { input },
  context: ResolversContext,
) => {
  const result = await getUsersByLocationBounds(context.clients.user, input);

  return result;
};
