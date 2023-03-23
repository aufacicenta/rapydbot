export type InvoicePaymentMethodsPayments = {
  id: string;
  receivedDate: number;
  value: string;
  fee: string;
  status: "Invalid" | "Processing" | "Settled";
  destination: string;
};

export type InvoicePaymentMethods = {
  activated: boolean;
  destination: string;
  paymentLink: string;
  rate: string;
  paymentMethodPaid: string;
  totalPaid: string;
  due: string;
  amount: string;
  networkFee: string;
  payments: InvoicePaymentMethodsPayments[];
  paymentMethod: "BTC";
  cryptoCode: "BTC";
};

export type GetInvoiceResponse = {
  metadata: Metadata;
  checkout: Checkout;
  receipt: Receipt;
  id: string;
  storeId: string;
  amount: string;
  currency: string;
  type: string;
  checkoutLink: string;
  createdTime: number;
  expirationTime: number;
  monitoringExpiration: number;
  status: string;
  additionalStatus: string;
  availableStatusesForManualMarking: string[];
  archived: boolean;
};

export type Checkout = {
  speedPolicy: string;
  paymentMethods: string[];
  defaultPaymentMethod: string;
  expirationMinutes: number;
  monitoringMinutes: number;
  paymentTolerance: number;
  redirectURL: string;
  redirectAutomatically: boolean;
  requiresRefundEmail: boolean;
  checkoutType: null;
  defaultLanguage: string;
};

export type Metadata = {
  orderId: string;
  orderUrl: string;
};

export type Receipt = {
  enabled: boolean;
  showQR: null;
  showPayments: null;
};
