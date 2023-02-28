import { GetCampaignActionsReply } from "@rapydbot/campaign";

export type Action = {
  isTimeoutSet: boolean;
  isLast?: boolean;
} & GetCampaignActionsReply.AsObject;

export type Actions = {
  [key: string]: Action;
};
