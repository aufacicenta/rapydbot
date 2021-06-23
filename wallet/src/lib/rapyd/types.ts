export interface IRapydRequestParams<B> {
  path: string;
  body?: B;
}

export interface RequestSignature {
  method: string;
  path: string;
  salt: string;
  accessKey: string;
  secretKey: string;
  timestamp: number;
  body?: any;
}

export enum HttpMethods {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PUT = "put",
}

export type WalletObjectResponse = {
  phone_number: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  id: string;
  status: "ACT" | "DIS";
  accounts: [];
  verification_status: "not verified" | "KYCd";
  type: "person" | "company" | "client";
  metadata: {};
  ewallet_reference_id: string | null;
  category: "collect" | "disburse" | "card_authorization" | "general" | null;
  contacts: {
    data: [];
    has_more: boolean;
    total_count: number;
    url: string;
  };
};

export type CheckoutObjectResponse = {
  country: string;
  currency: string;
  amount: number;
  redirect_url: string;
};

export type TransferFundsBetweenWalletsResponse = {
  id: string;
  status: string;
  destination_ewallet_id: string;
  source_ewallet_id: string;
};

export type SetTransferFromWalletResponse = {
  id: string;
  source_transaction_id: string;
  status: string;
  destination_ewallet_id: string;
  source_ewallet_id: string;
  destination_transaction_id: string;
};

export type GetDetailsOfWalletTransactionResponse = {
  id: string;
  amount: number;
  currency: string;
  ewallet_id: string;
  status: string;
  action_data: {
    paid: boolean;
  };
};

export type GetWalletBalanceResponse = {
  currency: string;
  balance: number;
  received_balance: number;
  on_hold_balance: number;
  reserve_balance: number;
};

export type CreateWalletParams = {
  ewallet_reference_id: string;
};

export type CreateCheckoutPageParams = {
  country: string;
  currency: string;
  ewallet: string;
  amount: number;
  metadata: {
    userId: string;
    msg: string;
  };
};

export type TransferFundsBetweenWalletsParams = {
  source_ewallet: string;
  destination_ewallet: string;
  currency: string;
  amount: number;
  metadata: {
    senderUserId: string;
    recipientUserId: string;
    msg: string;
  };
};

export type SetTransferFromWalletParams = {
  id: string;
  status: string;
};
