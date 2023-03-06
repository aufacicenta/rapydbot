import clsx from "clsx";
import { useTranslation } from "next-i18next";

import { MainPanel } from "ui/mainpanel/MainPanel";
import { Typography } from "ui/typography/Typography";

import { HomeProps } from "./Home.types";
import styles from "./Home.module.scss";
import { Grid } from "ui/grid/Grid";
import { Button } from "ui/button/Button";
import { Icon } from "ui/icon/Icon";
import { Navbar } from "ui/navbar/Navbar";

export function Home({ className }: HomeProps) {
  const { t } = useTranslation(["home", "common"]);

  return (
    <div className={clsx(styles.home, className)}>
      <MainPanel.Container>
        <Navbar />
        <Typography.Headline3 className={styles.home__intro}>
          Telegram Informer, <em>aka</em> TGI — is a Telegram based conversational interface designed to provide a new
          kind of job: <strong>anonymous news reporting</strong>{" "}
          <Typography.Text inline display inherit>
            »
          </Typography.Text>
        </Typography.Headline3>
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
        <div className={styles["home__login-box"]}>
          <Button variant="outlined" size="l" fullWidth>
            Log In with Telegram <Icon name="icon-paper-plane" />
          </Button>
        </div>
        <section>
          <Typography.Headline2 align="center">FAQs</Typography.Headline2>
        </section>
        <section>
          <Typography.Headline2 align="center">Use Cases</Typography.Headline2>
        </section>
      </MainPanel.Container>
    </div>
  );
}
