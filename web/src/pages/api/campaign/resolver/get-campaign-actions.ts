import { QueryResolvers } from "api/codegen/resolvers-types";
import { getCampaignActions } from "@rapydbot/campaign";
import { ResolversContext } from "api/graphql";

export const getCampaignActionsResolver: QueryResolvers["getCampaignActions"] = async (
  _parent,
  { input },
  context: ResolversContext,
) => {
  const campaignActions = await getCampaignActions(context.clients.campaign, input);

  return campaignActions.map(({ id, campaignId, initialInstruction, reply, intentAction }) => ({
    campaignActionId: id,
    campaignId,
    initialInstruction,
    reply,
    intentAction,
  }));
};
