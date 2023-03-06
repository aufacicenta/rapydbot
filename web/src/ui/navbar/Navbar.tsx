import clsx from "clsx";
import { useEffect, useState } from "react";

import { Grid } from "ui/grid/Grid";
import { Typography } from "ui/typography/Typography";

import { NavbarProps } from "./Navbar.types";
import styles from "./Navbar.module.scss";

export const Navbar: React.FC<NavbarProps> = ({ children, className }) => {
  const [glyph, setGlyph] = useState("_");

  useEffect(() => {
    const glyphs = ["_", "√", "☻", "❖", "🅫", "♥", "₳", "¿", "0", "?"];

    const interval = setInterval(() => {
      setGlyph(glyphs[Math.floor(Math.random() * glyphs.length)]);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={clsx(styles.navbar, className)}>
      <div className={styles.navbar__box}>
        <Grid.Row>
          <Grid.Col>
            <div className={styles.navbar__left}>
              <Typography.Headline1 flat className={styles.navbar__title}>
                INFORMER&nbsp;&nbsp;<span>{glyph}</span>
              </Typography.Headline1>
            </div>
          </Grid.Col>
          <Grid.Col>
            <div className={styles.navbar__right}>
              <Typography.Headline2 flat className={styles.navbar__logo}>
                tgi
              </Typography.Headline2>
            </div>
          </Grid.Col>
        </Grid.Row>
      </div>

      <div className={styles.navbar__stats}>
        <div>
          <Typography.MiniDescription flat>Total Disbursed</Typography.MiniDescription>
          <Typography.Description flat>USDT 234,567</Typography.Description>
        </div>
        <div>
          <Typography.MiniDescription flat>Active Campaigns</Typography.MiniDescription>
          <Typography.Description flat>251</Typography.Description>
        </div>
        <div>
          <Typography.MiniDescription flat>Active Informers</Typography.MiniDescription>
          <Typography.Description flat>23,456</Typography.Description>
        </div>
        <div>
          <Typography.MiniDescription flat>Approved Replies</Typography.MiniDescription>
          <Typography.Description flat>234,560</Typography.Description>
        </div>
      </div>
    </div>
  );
};
