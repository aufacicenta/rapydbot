import clsx from "clsx";
import { useCreateCampaignActionMutation, useGetCampaignActionsQuery, useGetUsersCoordinatesQuery } from "api/codegen";
import { Form as RFForm } from "react-final-form";
import { useEffect, useState } from "react";
import { LngLat } from "mapbox-gl";

import { Button } from "ui/button/Button";
import { MainPanel } from "ui/mainpanel/MainPanel";
import { Navbar } from "ui/navbar/Navbar";
import { Typography } from "ui/typography/Typography";
import { Icon } from "ui/icon/Icon";
import { Form } from "ui/form/Form";
import { Grid } from "ui/grid/Grid";
import { Card } from "ui/card/Card";
import { useGetAuthToken } from "hooks/useGetAuthToken/useGetAuthToken";
import { PolygonBounds } from "ui/map/polygon-bounds/PolygonBounds";

import { CreateCampaignActionForm, EditCampaignProps } from "./EditCampaign.types";
import styles from "./EditCampaign.module.scss";

// @TODO i18n
export const EditCampaign: React.FC<EditCampaignProps> = ({ campaignId, className }) => {
  const [informersCoordinates, setInformersCoordinates] = useState<LngLat[]>([]);

  useGetAuthToken();

  // @TODO handle error
  const getCampaignActionsResult = useGetCampaignActionsQuery({
    variables: { input: { campaignId } },
  });

  const getUsersCoordinatesResult = useGetUsersCoordinatesQuery();

  const [createCampaignAction, createCampaignActionResult] = useCreateCampaignActionMutation();

  useEffect(() => {
    if (!getUsersCoordinatesResult.data?.getUsersCoordinates) {
      return;
    }

    const coordinates = getUsersCoordinatesResult.data.getUsersCoordinates.map(
      (lnglat) => new LngLat(lnglat!.longitude, lnglat!.latitude),
    );

    setInformersCoordinates(coordinates);
  }, [getUsersCoordinatesResult.data]);

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

        <section className={styles["edit-campaign__map"]}>
          <PolygonBounds informersCoordinates={informersCoordinates} />
        </section>

        <section>
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
                    <Grid.Col lg={6}>
                      <div className={styles["edit-campaign__form--button-submit"]}>
                        <Button type="submit" variant="outlined" size="auto" color="secondary">
                          {createCampaignActionResult.loading ? "Loading..." : "Add Question"}
                        </Button>
                      </div>
                    </Grid.Col>
                  </Grid.Row>
                </div>
              </form>
            )}
          />
        </section>

        <section className={styles["edit-campaign__campaign-actions"]}>
          {getCampaignActionsResult.loading ? (
            <Typography.Text>Loading...</Typography.Text>
          ) : (
            <Card>
              <Card.Header>
                <Grid.Row>
                  <Grid.Col>
                    <Typography.Headline2 flat>Campaign Questions</Typography.Headline2>
                  </Grid.Col>
                  <Grid.Col>
                    {/* @TODO calc price per campaign session */}
                    <div className={styles["edit-campaign__campaign-actions--price"]}>
                      <Typography.Description flat>* Price per informer</Typography.Description>
                      <Typography.Text flat>USDT 1.00</Typography.Text>
                    </div>
                  </Grid.Col>
                </Grid.Row>
              </Card.Header>
              <Card.Content>
                {getCampaignActionsResult.data?.getCampaignActions.map((campaignAction) => (
                  <div
                    key={campaignAction?.campaignActionId}
                    className={styles["edit-campaign__campaign-actions--item"]}
                  >
                    <Typography.Text flat>{campaignAction?.initialInstruction}</Typography.Text>
                    <Typography.Text flat>
                      <span>Re: </span>
                      {campaignAction?.reply}
                    </Typography.Text>
                    <Typography.Text flat>
                      <span>Label: </span>
                      {campaignAction?.intentAction}
                    </Typography.Text>
                    <Typography.Link href="#">Edit</Typography.Link>
                  </div>
                ))}

                <Typography.Description>
                  * Price is an estimate, you need to approve the replies in order to release the funds to each
                  informer. Disbursement can be partial.
                </Typography.Description>
              </Card.Content>
            </Card>
          )}
        </section>

        <section className={styles["edit-campaign__publish"]}>
          {/* @TODO display confirmation modal and check credit balance */}
          <Button variant="outlined" fullWidth>
            Publish Campaign
          </Button>
        </section>
      </MainPanel.Container>
    </div>
  );
};
