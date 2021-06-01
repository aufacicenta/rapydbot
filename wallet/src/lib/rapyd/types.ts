export interface IRapydRequestParams {
  path: string;
  body: any;
}

export interface IRapydClient {
  get<T>(params: IRapydRequestParams): Promise<T>;
  post<T>(params: IRapydRequestParams): Promise<T>;
  put<T>(params: IRapydRequestParams): Promise<T>;
  delete<T>(params: IRapydRequestParams): Promise<T>;
}

export interface RequestSignature {
  method: string;
  path: string;
  salt: string;
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
