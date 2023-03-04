import clsx from "clsx";
import { useTranslation } from "next-i18next";

import { MainPanel } from "ui/mainpanel/MainPanel";
import { Typography } from "ui/typography/Typography";

import { HomeProps } from "./Home.types";
import styles from "./Home.module.scss";

export const Home: React.FC<HomeProps> = ({ className }) => {
  const { t } = useTranslation(["home", "common"]);

  return (
    <>
      <div className={clsx(styles.home, className)}>
        <MainPanel.Container>
          <div className={styles["home__title-row"]}>
            <Typography.Headline1 className={styles.home__title}>{t("home.title")}</Typography.Headline1>
          </div>
        </MainPanel.Container>
      </div>
    </>
  );
};
