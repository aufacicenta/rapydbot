import { GetStaticPropsContext, NextPage } from "next";
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

import { DashboardLayout } from "layouts/dashboard-layout/DashboardLayout";
import { HomeContainer } from "app/home/HomeContainer";

const Index: NextPage = () => {
  const { t } = useTranslation("head");

  return (
    <DashboardLayout>
      <Head>
        <title>{t("head.og.title")}</title>
        <meta name="description" content={t("head.og.description")} />
        <meta property="og:title" content={t("head.og.title")} />
        <meta property="og:description" content={t("head.og.description")} />
        <meta property="og:url" content="https://app.pulsemarkets.org/" />
      </Head>

      <HomeContainer />
    </DashboardLayout>
  );
};

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  await i18n?.reloadResources();

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "head", "home", "swap-card", "price-market"])),
    },
  };
};

export default Index;
