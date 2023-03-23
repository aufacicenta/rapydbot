import { MutationResolvers } from "api/codegen/resolvers-types";
import { createCampaignAction } from "@rapydbot/campaign";
import { ResolversContext } from "api/graphql";

export const createCampaignActionResolver: MutationResolvers["createCampaignAction"] = async (
  _parent,
  { input },
  context: ResolversContext,
) => {
  const { campaignActionId } = await createCampaignAction(context.clients.campaign, input);

  return {
    campaignActionId,
  };
};
