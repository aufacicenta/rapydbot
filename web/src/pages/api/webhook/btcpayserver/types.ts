export type BtcPayServerWebhookRequestBody = {
  manuallyMarked: boolean;
  deliveryId: string;
  webhookId: string;
  originalDeliveryId: string;
  isRedelivery: boolean;
  type:
    | "InvoiceSettled"
    | "InvoiceCreated"
    | "InvoiceReceivedPayment"
    | "InvoiceProcessing"
    | "InvoiceExpired"
    | "InvoiceInvalid"
    | "InvoicePaymentSettled";
  timestamp: number;
  storeId: string;
  invoiceId: string;
  metadata?: {
    campaignId?: string;
  };
};
