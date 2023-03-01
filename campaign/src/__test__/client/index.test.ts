import { IntentAction } from "@rapydbot/intent-recognition/providers/cohere/types";
import getRandomUsername from "@rapydbot/wallet/__test__/util/getRandomUsername";

import { CampaignClientGenerator, CampaignClient } from "../../client";
import { createCampaign } from "../../client/create-campaign";
import { createCampaignAction } from "../../client/create-campaign-action";
import { createCampaignActionMessage } from "../../client/create-campaign-action-message";
import { getCampaignActionMessages } from "../../client/get-campaign-action-messages";
import { getCampaignActionMessagesByUserId } from "../../client/get-campaign-action-messages-by-user-id";
import { getCampaignActions } from "../../client/get-campaign-actions";
import { instructions } from "../util/instructions";

let client: CampaignClient;

const { IP_ADDRESS: address, HTTP_PORT: port } = process.env;

describe("client", () => {
  const [issuerId, user1, user2] = [
    getRandomUsername(),
    getRandomUsername(),
    getRandomUsername(),
  ];

  beforeAll(async () => {
    client = new CampaignClientGenerator(`${address}:${port}`).create();
  });

  test("success: createCampaign", async () => {
    const campaignId = await createCampaign(client, { issuerId });

    expect(campaignId).toBeDefined();
  });

  test("success: create campaign actions", async () => {
    const campaignId = await createCampaign(client, { issuerId });

    for (const key in instructions) {
      const initialInstruction = instructions[key].initialInstruction;
      const reply = instructions[key].reply;

      const campaignActionId = await createCampaignAction(client, {
        campaignId,
        initialInstruction,
        reply,
        intentAction: key,
      });

      expect(campaignActionId).toBeDefined();
    }
  });

  test("success: get campaign actions", async () => {
    const campaignId = await createCampaign(client, { issuerId });

    for (const key in instructions) {
      const initialInstruction = instructions[key].initialInstruction;
      const reply = instructions[key].reply;

      await createCampaignAction(client, {
        campaignId,
        initialInstruction,
        reply,
        intentAction: key,
      });
    }

    const [instruction1, instruction2] = await getCampaignActions(client, {
      campaignId,
    });

    expect(instruction1.id).toBeDefined();
    expect(instruction1.campaignId).toEqual(campaignId);
    expect(instruction1.initialInstruction).toEqual(
      instructions[IntentAction.WalletCreate].initialInstruction,
    );
    expect(instruction1.reply).toEqual(instructions[IntentAction.WalletCreate].reply);
    expect(instruction1.intentAction).toEqual(IntentAction.WalletCreate);

    expect(instruction2.campaignId).toEqual(campaignId);
    expect(instruction2.initialInstruction).toEqual(
      instructions[IntentAction.TransactionsFrom].initialInstruction,
    );
    expect(instruction2.reply).toEqual(instructions[IntentAction.TransactionsFrom].reply);
    expect(instruction2.intentAction).toEqual(IntentAction.TransactionsFrom);
  });

  test("success: create campaign actions messages", async () => {
    const campaignId = await createCampaign(client, { issuerId });

    let campaign_action_id: string;

    for (const key in instructions) {
      const initialInstruction = instructions[key].initialInstruction;
      const reply = instructions[key].reply;

      const campaignActionId = await createCampaignAction(client, {
        campaignId,
        initialInstruction,
        reply,
        intentAction: key,
      });

      if (!campaign_action_id) {
        campaign_action_id = campaignActionId;
      }

      const messages = [
        "message 1",
        `message with format <strong>bold</strong>`,
        `message with whitespace\n\nline.`,
      ];

      for (const message of messages) {
        const campaignActionMessageId_1 = await createCampaignActionMessage(client, {
          campaignActionId,
          userId: user1,
          message,
        });

        const campaignActionMessageId_2 = await createCampaignActionMessage(client, {
          campaignActionId,
          userId: user2,
          message,
        });

        expect(campaignActionMessageId_1).toBeDefined();
        expect(campaignActionMessageId_2).toBeDefined();
      }
    }

    const campaignActionMessages = await getCampaignActionMessages(client, {
      campaignActionId: campaign_action_id,
    });

    for (const message of campaignActionMessages) {
      expect(message.campaignActionId).toEqual(campaign_action_id);
    }

    const campaignActionMessagesByUserId = await getCampaignActionMessagesByUserId(client, {
      campaignActionId: campaign_action_id,
      userId: user1,
    });

    for (const message of campaignActionMessagesByUserId) {
      expect(message.campaignActionId).toEqual(campaign_action_id);
      expect(message.userId).toEqual(user1);
    }
  });
});
