export interface IRapydRequestParams<T> {
  path: string;
  body: T;
}

export interface IRapydClient {
  get<T>(params: IRapydRequestParams<T>): Promise<T>;
  post<T>(params: IRapydRequestParams<T>): Promise<T>;
}

export interface RequestSignature {
  method: string;
  path: string;
  salt: number;
  accessKey: string;
  secretKey: string;
  body: any;
}

export enum HttpMethods {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PUT = "put",
}
