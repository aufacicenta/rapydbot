import clsx from "clsx";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { MainPanel } from "ui/mainpanel/MainPanel";
import { ToastContextController } from "context/toast/ToastContextController";

import { DashboardLayoutProps } from "./DashboardLayout.types";
import styles from "./DashboardLayout.module.scss";

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { locale } = useRouter();

  useEffect(() => {
    // @todo set with a toggle button from navbar or footer
    document.body.dataset.theme = "dark";
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta property="og:image" content="/shared/pulse.png" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={locale} />
      </Head>
      <ToastContextController>
        <div id="modal-root" />
        <div id="dropdown-portal" />
        <div
          className={clsx(styles["dashboard-layout"], {
            [styles["dashboard-layout__with-top-alert"]]: true,
          })}
        >
          <MainPanel>{children}</MainPanel>
        </div>
      </ToastContextController>
    </>
  );
};
