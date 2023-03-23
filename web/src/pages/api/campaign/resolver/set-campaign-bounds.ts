import { MutationResolvers } from "api/codegen/resolvers-types";
import { setCampaignBounds } from "@rapydbot/campaign";
import { ResolversContext } from "api/graphql";

export const setCampaignBoundsResolver: MutationResolvers["setCampaignBounds"] = async (
  _parent,
  { input },
  context: ResolversContext,
) => {
  // @TODO check if user is authorized to set bounds — create context.auth helper function
  const { userId: issuerId } = context.auth || {};

  const { campaignId, bounds } = await setCampaignBounds(context.clients.campaign, { ...input, issuerId });

  return {
    campaignId,
    bounds,
  };
};
