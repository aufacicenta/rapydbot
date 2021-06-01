const rapydClientEnv = {
  BASE_URL: "https://sandboxapi.rapyd.net/",
  SALT_QTY: "12",
  ACCESS_KEY: "false_access_key",
  SECRET_KEY: "false_secret_key",
};

process.env = { ...process.env, ...rapydClientEnv };
