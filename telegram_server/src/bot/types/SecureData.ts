export type SecureData = {
  nonce: string;
  secure_data: {
    passport: {
      front_side: { file_hash: string; secret: string };
      selfie: { file_hash: string; secret: string };
      data: { data_hash: string; secret: string };
    };
    bank_statement: {
      files: Array<{ file_hash: string; secret: string }>;
    };
  };
};

export type DataCredentials = {
  data_hash: string;
  secret: string | Buffer;
};

export type FileCredentials = {
  file_hash: string;
  secret: string | Buffer;
};

export type StdCredentials = {
  hash: string;
  secret: Buffer;
};
