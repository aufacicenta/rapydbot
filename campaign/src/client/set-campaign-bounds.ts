import { CampaignClient, SetCampaignBoundsReply, SetCampaignBoundsRequest } from ".";

export const setCampaignBounds = (
  client: CampaignClient,
  { campaignId, bounds, issuerId }: SetCampaignBoundsRequest.AsObject,
): Promise<SetCampaignBoundsReply.AsObject> => {
  const request = new SetCampaignBoundsRequest();

  request.setCampaignId(campaignId);
  request.setBounds(bounds);
  request.setIssuerId(issuerId);

  return new Promise((resolve) => {
    client.setCampaignBounds(request, (error, reply) => {
      if (error) {
        throw error;
      }

      resolve({
        campaignId: reply.getCampaignId(),
        bounds: reply.getBounds(),
      });
    });
  });
};
