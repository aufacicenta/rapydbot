import clsx from "clsx";
import { useCreateCampaignActionMutation } from "api/codegen";
import { Form as RFForm } from "react-final-form";

import { Button } from "ui/button/Button";
import { MainPanel } from "ui/mainpanel/MainPanel";
import { Navbar } from "ui/navbar/Navbar";
import { Typography } from "ui/typography/Typography";
import { Icon } from "ui/icon/Icon";
import { Form } from "ui/form/Form";
import { Grid } from "ui/grid/Grid";

import { CreateCampaignActionForm, EditCampaignProps } from "./EditCampaign.types";
import styles from "./EditCampaign.module.scss";

// @TODO i18n
export const EditCampaign: React.FC<EditCampaignProps> = ({ campaignId, className }) => {
  const [createCampaignAction, createCampaignActionResult] = useCreateCampaignActionMutation();

  const onSubmit = async (values: CreateCampaignActionForm) => {
    await createCampaignAction({
      variables: {
        input: { campaignId, ...values },
      },
    });
  };

  return (
    <div className={clsx(styles["edit-campaign"], className)}>
      <MainPanel.Container>
        <Navbar />

        {/* @TODO back to campaigns */}
        <Typography.Anchor href="#" className={styles["edit-campaign__breadcrumb"]}>
          <Icon name="icon-chevron-left" /> Back to campaigns
        </Typography.Anchor>

        <Typography.Headline1 className={styles["edit-campaign__title"]}>
          Add questions to your campaign
        </Typography.Headline1>

        <RFForm
          onSubmit={onSubmit}
          render={({ handleSubmit, form }) => (
            <form
              onSubmit={(event) => {
                handleSubmit(event)!.then(form.reset);
              }}
            >
              <div className={styles["edit-campaign__form--input-box"]}>
                <Form.Label htmlFor="initialInstruction">What would you like to know?</Form.Label>
                <Form.TextInput id="initialInstruction" type="text" placeholder="Type a question here..." />
              </div>
              <div className={styles["edit-campaign__form--input-box"]}>
                <Form.Label htmlFor="reply">What should the bot reply after this question?</Form.Label>
                <Form.TextInput id="reply" type="text" placeholder="Type a reply..." />
              </div>
              <div className={styles["edit-campaign__form--input-box"]}>
                <Grid.Row>
                  <Grid.Col lg={6}>
                    <Form.Label htmlFor="intentAction">Add a label to your question</Form.Label>
                    <Form.TextInput id="intentAction" type="text" placeholder="eg. price_index" />
                  </Grid.Col>
                </Grid.Row>
              </div>

              <div className={styles["edit-campaign__form--button-submit"]}>
                <Button type="submit" variant="outlined" size="auto">
                  {createCampaignActionResult.loading ? "Loading..." : "Create Campaign Action"}
                </Button>
              </div>
            </form>
          )}
        />
      </MainPanel.Container>
    </div>
  );
};
