import clsx from "clsx";
import { useCreateCampaignActionMutation } from "api/codegen";

import { Button } from "ui/button/Button";

import { EditCampaignProps } from "./EditCampaign.types";
import styles from "./EditCampaign.module.scss";

export const EditCampaign: React.FC<EditCampaignProps> = ({ campaignId, className }) => {
  const [createCampaignAction, createCampaignActionResult] = useCreateCampaignActionMutation();

  const onClickCreateCampaignAction = async () => {
    await createCampaignAction({
      variables: {
        input: { campaignId, initialInstruction: "initialInstruction", intentAction: "intentAction", reply: "reply" },
      },
    });
  };

  return (
    <div className={clsx(styles["edit-campaign"], className)}>
      {createCampaignActionResult.loading && <div>Loading...</div>}
      <Button onClick={onClickCreateCampaignAction}>Create Campaign Action</Button>
    </div>
  );
};
