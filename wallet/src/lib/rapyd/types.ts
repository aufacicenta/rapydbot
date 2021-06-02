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

export type CreateWalletParams = {
  ewallet_reference_id: string;
};
