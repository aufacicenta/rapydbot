import { NextApiRequest, NextApiResponse } from "next";

import btcpayserver from "providers/btcpayserver";

import { BtcPayServerWebhookRequestBody } from "./types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data: BtcPayServerWebhookRequestBody = req.body;

    console.log(data);

    if (!data?.invoiceId || !data.storeId || !data?.metadata?.campaignId) {
      throw new Error("api/webhooks/btcpayserver: invalid data. no invoice ID");
    }

    const { storeId, invoiceId } = data;

    const invoice = await btcpayserver.getInvoice({
      storeId,
      invoiceId,
    });

    console.log({ invoice });

    if (invoice.status !== "Settled") {
      throw new Error("api/webhooks/btc-pay-server: no Settled payment methods exist for storeId:invoiceId");
    }

    // @TODO Update campaign issuer_id user_wallet.balance amount. Payment method should only be BTC Lightning Network. Should we store invoiceIds in a transactions table?

    const { amount } = invoice;

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    // @TODO Error: log to error logger
    console.error(error);
    res.status(500).send(error);
  }
};
