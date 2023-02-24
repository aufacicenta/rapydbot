import { getRandomUsername } from "@rapydbot/wallet/__test__/util";

import {
  CampaignClientGenerator,
  CampaignClient,
  CreateCampaignRequest,
  CreateCampaignReply,
} from "../../client";

let client: CampaignClient;

const { IP_ADDRESS: address, HTTP_PORT: port } = process.env;

describe("client", () => {
  beforeAll(async () => {
    client = new CampaignClientGenerator(`${address}:${port}`).create();
  });

  test("success: createCampaign", async () => {
    const createCampaignRequest = new CreateCampaignRequest();

    createCampaignRequest.setUserId(getRandomUsername());
    createCampaignRequest.setMessageId(getRandomUsername());

    const createCampaign = (): Promise<CreateCampaignReply.AsObject["campaignId"]> =>
      new Promise((resolve) => {
        client.createCampaign(createCampaignRequest, (error, reply) => {
          if (error) {
            throw error;
          }

          resolve(reply.getCampaignId());
        });
      });

    const campaignId = await createCampaign();

    expect(campaignId).toBeDefined();
  });
});
