import { CampaignClient, CreateCampaignActionReply, CreateCampaignActionRequest } from ".";

export const createCampaignAction = (
  client: CampaignClient,
  { campaignId, initialInstruction, intentAction, reply }: CreateCampaignActionRequest.AsObject,
): Promise<CreateCampaignActionReply.AsObject> => {
  const request = new CreateCampaignActionRequest();

  request.setCampaignId(campaignId);
  request.setInitialInstruction(initialInstruction);
  request.setIntentAction(intentAction);
  request.setReply(reply);

  return new Promise((resolve) => {
    client.createCampaignAction(request, (error, reply) => {
      if (error) {
        throw error;
      }

      resolve({
        campaignActionId: reply.getCampaignActionId(),
      });
    });
  });
};
