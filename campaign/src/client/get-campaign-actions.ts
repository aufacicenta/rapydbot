import { CampaignClient, GetCampaignActionsReply, GetCampaignActionsRequest } from ".";

export const getCampaignActions = (
  client: CampaignClient,
  { campaignId }: GetCampaignActionsRequest.AsObject,
): Promise<Array<GetCampaignActionsReply.AsObject>> => {
  const request = new GetCampaignActionsRequest();

  request.setCampaignId(campaignId);

  return new Promise((resolve) => {
    const call = client.getCampaignActions(request);

    const response: Array<GetCampaignActionsReply.AsObject> = [];

    call.on("data", (data: GetCampaignActionsReply) => {
      response.push(data.toObject());
    });

    call.on("end", () => {
      resolve(response);
    });
  });
};
