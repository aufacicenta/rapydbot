import { EditCampaign } from "./EditCampaign";
import { EditCampaignContainerProps } from "./EditCampaign.types";

export const EditCampaignContainer = ({ campaignId }: EditCampaignContainerProps) => (
  <EditCampaign campaignId={campaignId} />
);
