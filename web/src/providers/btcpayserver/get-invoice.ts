import { GetInvoiceResponse } from "./types";

const { BTC_PAY_SERVER_BASE_URL, BTC_PAY_SERVER_AUTH_TOKEN } = process.env;

export const getInvoice = async ({ storeId, invoiceId }: { storeId: string; invoiceId: string }) => {
  const response = await fetch(`${BTC_PAY_SERVER_BASE_URL}/stores/${storeId}/invoices/${invoiceId}`, {
    headers: {
      Authorization: `Basic ${BTC_PAY_SERVER_AUTH_TOKEN}`,
    },
  });

  const content: GetInvoiceResponse = await response.json();

  if (content.id === undefined) {
    throw new Error("getInvoice: invoice not found");
  }

  return content;
};

export default getInvoice;
