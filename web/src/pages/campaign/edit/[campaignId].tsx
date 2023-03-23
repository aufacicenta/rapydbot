import { GetServerSidePropsContext, NextPage } from "next";

import { DashboardLayout } from "layouts/dashboard-layout/DashboardLayout";
import { EditCampaignContainer } from "app/campaign/edit-campaign/EditCampaignContainer";
import { EditCampaignContainerProps } from "app/campaign/edit-campaign/EditCampaign.types";
import { CheckoutContextController } from "context/checkout/CheckoutContextController";

const Page: NextPage<EditCampaignContainerProps> = ({ campaignId }) => (
  <DashboardLayout>
    <CheckoutContextController>
      <EditCampaignContainer campaignId={campaignId} />
    </CheckoutContextController>
  </DashboardLayout>
);

export const getServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  const campaignId = params?.campaignId;

  return {
    props: {
      campaignId,
    },
  };
};

export default Page;
