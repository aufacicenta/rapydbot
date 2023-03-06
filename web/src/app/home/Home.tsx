import clsx from "clsx";
import { useTranslation } from "next-i18next";

import { MainPanel } from "ui/mainpanel/MainPanel";
import { Typography } from "ui/typography/Typography";
import { Grid } from "ui/grid/Grid";
import { Navbar } from "ui/navbar/Navbar";
import { Card } from "ui/card/Card";
import { TelegramLoginButton } from "ui/auth/telegram-login/telegram-login-button/TelegramLoginButton";

import styles from "./Home.module.scss";
import { HomeProps } from "./Home.types";

export const Home = ({ className }: HomeProps) => {
  const { t } = useTranslation(["home", "common"]);

  return (
    <div className={clsx(styles.home, className)}>
      <MainPanel.Container>
        <Navbar />
        <Typography.Headline3 className={styles.home__intro}>
          Telegram Informer, <em>abbr.</em> TGI, is a Telegram based conversational interface designed to provide a new
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
          <TelegramLoginButton />
        </div>
        <section className={styles.home__section}>
          <Typography.Headline2 align="center" display flat>
            ⌥
          </Typography.Headline2>
          <Typography.Headline2 align="center">FAQs</Typography.Headline2>
          <div className={styles["home__faqs--box"]}>
            <Typography.Headline3>What is TGI?</Typography.Headline3>
            <Typography.Text>
              Telegram Informer is a network of anonymous reporters. Each informer shares its location periodically and
              accepts a campaign if it's targeted within their area. They'll reply to your campaign questions and you'll
              approve each question before disbursing the funds.
            </Typography.Text>
          </div>
          <div className={styles["home__faqs--box"]}>
            <Typography.Headline3>How much does it cost?</Typography.Headline3>
            <Typography.Text>
              TGI pays 0.5 USDT per reply. For a campaign of 1 question, expecting 100 replies, you pay 50 USDT. We
              charge 2% per active campaign.
            </Typography.Text>
          </div>
          <div className={styles["home__faqs--box"]}>
            <Typography.Headline3>Can I withdraw my campaigns' funds?</Typography.Headline3>
            <Typography.Text>
              Yes, but only if the campaigns are not active. An active campaign has already summoned informers and it
              might already have replies.
            </Typography.Text>
          </div>
          <div className={styles["home__faqs--box"]}>
            <Typography.Headline3>How reliable are the answers to my campaign?</Typography.Headline3>
            <Typography.Text>
              You control the radius or territory of your campaign. You can target a single town, an entire country or
              the whole world. TGI will summon the informers network and you get to verify each reply for its quality.
            </Typography.Text>
          </div>
          <div className={styles["home__faqs--box"]}>
            <Typography.Headline3>
              How do I make sure there are no informers with multiple accounts?
            </Typography.Headline3>
            <Typography.Text>
              You can create a campaign requesting for evidence such as a picture sent in real-time, or a campaign that
              requests the user to verify its identity; this will cost more per reply, of course.
            </Typography.Text>
          </div>
        </section>
        <section className={styles.home__section}>
          <Typography.Headline2 align="center" display flat>
            ✿
          </Typography.Headline2>
          <Typography.Headline2 align="center">Use Cases</Typography.Headline2>
          <Grid.Row>
            <Grid.Col lg={6} className={styles["home__use-cases--card-box"]}>
              <Card className={styles["home__use-cases--card"]}>
                <Card.Header>
                  <Typography.Headline4 flat>Focus Groups</Typography.Headline4>
                </Card.Header>
                <Card.Content>
                  <Typography.Text flat>
                    Request an opinion over a certain idea or product to complement your marketing strategy.
                  </Typography.Text>
                </Card.Content>
              </Card>
            </Grid.Col>
            <Grid.Col lg={6} className={styles["home__use-cases--card-box"]}>
              <Card className={styles["home__use-cases--card"]}>
                <Card.Header>
                  <Typography.Headline4 flat>Real-time Price Indexes</Typography.Headline4>
                </Card.Header>
                <Card.Content>
                  <Typography.Text flat>
                    Request the price of a certain commodity, targetted by region. Use the data to create a real-time
                    feed by fetching our API.
                  </Typography.Text>
                </Card.Content>
              </Card>
            </Grid.Col>
            <Grid.Col lg={6} className={styles["home__use-cases--card-box"]}>
              <Card className={styles["home__use-cases--card"]}>
                <Card.Header>
                  <Typography.Headline4 flat>A.I. Model Training</Typography.Headline4>
                </Card.Header>
                <Card.Content>
                  <Typography.Text flat>
                    Request hundreds of ways to respond to a certain question. The newest text AI models require at
                    least 100 different ways of writing the same prompt.
                  </Typography.Text>
                </Card.Content>
              </Card>
            </Grid.Col>
            <Grid.Col lg={6} className={styles["home__use-cases--card-box"]}>
              <Card className={styles["home__use-cases--card"]}>
                <Card.Header>
                  <Typography.Headline4 flat>Restricted Zones Access</Typography.Headline4>
                </Card.Header>
                <Card.Content>
                  <Typography.Text flat>Request information from informers on war zones.</Typography.Text>
                </Card.Content>
              </Card>
            </Grid.Col>
          </Grid.Row>
        </section>
      </MainPanel.Container>
    </div>
  );
};
