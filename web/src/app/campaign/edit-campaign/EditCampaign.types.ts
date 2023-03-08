import { CreateCampaignActionInput } from "api/codegen";
import { ReactNode } from "react";

export type EditCampaignProps = {
  campaignId: string;
  children?: ReactNode;
  className?: string;
};

export type EditCampaignContainerProps = {
  campaignId: string;
  children?: ReactNode;
  className?: string;
};

export type CreateCampaignActionForm = Omit<CreateCampaignActionInput, "campaignId">;
