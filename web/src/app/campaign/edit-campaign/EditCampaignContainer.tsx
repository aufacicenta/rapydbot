import dynamic from "next/dynamic";

import { EditCampaignContainerProps, EditCampaignProps } from "./EditCampaign.types";

const EditCampaign = dynamic<EditCampaignProps>(() => import("./EditCampaign").then((mod) => mod.EditCampaign), {
  ssr: false,
});

export const EditCampaignContainer = ({ campaignId }: EditCampaignContainerProps) => (
  <EditCampaign campaignId={campaignId} />
);
