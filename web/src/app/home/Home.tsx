import clsx from "clsx";
import { useTranslation } from "next-i18next";

import { MainPanel } from "ui/mainpanel/MainPanel";
import { Typography } from "ui/typography/Typography";

import { HomeProps } from "./Home.types";
import styles from "./Home.module.scss";
import { Grid } from "ui/grid/Grid";

export function Home({ className }: HomeProps) {
  const { t } = useTranslation(["home", "common"]);

  return (
    <div className={clsx(styles.home, className)}>
      <MainPanel.Container>
        <Typography.Headline2 className={styles.home__intro}>
          Telegram Informer, <em>aka</em> TGI — is a Telegram based conversational interface designed to provide a new
          kind of job: <strong>anonymous news reporting</strong>.
        </Typography.Headline2>
        <Grid.Row>
          <Grid.Col>
            <div className={styles["home__border-column"]}>
              <Typography.Description>Request</Typography.Description>
              <Typography.Headline3 className={styles["home__border-column--title"]}>
                Pay in USDT/ETH for real-time information:
              </Typography.Headline3>
              <Typography.Text flat>- Create & fund a campaign</Typography.Text>
              <Typography.Text flat>- Wait for replies</Typography.Text>
              <Typography.Text flat>- Approve each reply for reliability</Typography.Text>
            </div>
          </Grid.Col>
          <Grid.Col>
            <div className={styles["home__border-column"]}>
              <Typography.Description>Inform</Typography.Description>
              <Typography.Headline3 className={styles["home__border-column--title"]}>
                Get paid USDT/ETH for being an anonymous informer:
              </Typography.Headline3>
              <Typography.Text flat>- Accept a campaign</Typography.Text>
              <Typography.Text flat>- Reply to its questions</Typography.Text>
              <Typography.Text flat>- Earn USDT/ETH per reply</Typography.Text>
            </div>
          </Grid.Col>
        </Grid.Row>
      </MainPanel.Container>
    </div>
  );
}
