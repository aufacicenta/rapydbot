import { InvoicePaymentMethods, InvoicePaymentMethodsPayments } from "./types";

export const getInvoicePaymentMethod = async ({
  storeId,
  invoiceId,
  status,
}: {
  storeId: string;
  invoiceId: string;
  status: InvoicePaymentMethodsPayments["status"];
}) => {
  const response = await fetch(
    `${process.env.BTC_PAY_SERVER_BASE_URL}/stores/${storeId}/invoices/${invoiceId}/payment-methods`,
    {
      headers: {
        Authorization: `Basic ${process.env.BTC_PAY_SERVER_AUTH_TOKEN}`,
      },
    },
  );

  const content: InvoicePaymentMethods[] = await response.json();

  if (content.length === undefined) {
    throw new Error("getInvoicePaymentMethod: invoice not found");
  }

  let payment: InvoicePaymentMethodsPayments;
  // eslint-disable-next-line no-restricted-syntax
  for (const paymentMethod of content) {
    if (paymentMethod.payments.length > 0) {
      [payment] = paymentMethod.payments;

      if (payment.status === status) {
        return payment;
      }
    }
  }

  return null;
};

export default getInvoicePaymentMethod;
