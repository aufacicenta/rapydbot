import clsx from "clsx";
import { useEffect, useState } from "react";
import { NavbarProps } from "./Navbar.types";
import styles from "./Navbar.module.scss";
import { Grid } from "ui/grid/Grid";
import { Typography } from "ui/typography/Typography";

export const Navbar: React.FC<NavbarProps> = ({ children, className }) => {
  const [a, setA] = useState();

  useEffect(() => {}, []);

  return (
    <div className={clsx(styles["navbar"], className)}>
      <Grid.Row>
        <Grid.Col>
          <div className={styles["navbar__left"]}>
            <Typography.Headline1 flat className={styles["navbar__title"]}>
              INFORMER
            </Typography.Headline1>
          </div>
        </Grid.Col>
        <Grid.Col>
          <div className={styles["navbar__right"]}>
            <Typography.Headline2 flat className={styles["navbar__logo"]}>
              tgi
            </Typography.Headline2>
          </div>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
};
