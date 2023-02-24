import { CampaignClient, CreateCampaignReply, CreateCampaignRequest } from ".";

export const createCampaign = (
  client: CampaignClient,
  { issuerId }: CreateCampaignRequest.AsObject,
): Promise<CreateCampaignReply.AsObject["campaignId"]> => {
  const request = new CreateCampaignRequest();

  request.setIssuerId(issuerId);

  return new Promise((resolve) => {
    client.createCampaign(request, (error, reply) => {
      if (error) {
        throw error;
      }

      resolve(reply.getCampaignId());
    });
  });
};
