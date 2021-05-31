import convict from "convict";

const configuration = convict({
  env: {
    doc: "The applicaton environment.",
    format: ["production", "development", "staging", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  server: {
    address: {
      doc: "The IP address to bind.",
      format: "*",
      default: "0.0.0.0",
      env: "IP_ADDRESS",
      arg: "address",
    },
    endpoint: {
      doc: "The IP address to bind.",
      format: "*",
      default: "/",
      env: "SERVER_ENDPOINT",
      arg: "server-endpoint",
    },
    port: {
      doc: "The port to bind HTTP.",
      format: "port",
      default: 4200,
      env: "HTTP_PORT",
      arg: "port",
    },
    testPort: {
      doc: "The port to bind HTTP.",
      format: "port",
      default: 4201,
      env: "HTTP_TEST_PORT",
      arg: "test-port",
    },
    websocketPort: {
      doc: "The port to bind HTTP.",
      format: "port",
      default: 4202,
      env: "FUNDING_SERVICE_WEBSOCKET_PORT",
      arg: "websocket-port",
    },
  },
  rapyd: {
    accessKey: {
      doc: "Rapyd API Access Key",
      format: String,
      default: "",
      env: "RAPYD_ACCESS_KEY",
      sensitive: true,
    },
    secretKey: {
      doc: "Rapyd API Secret Key",
      format: String,
      default: "",
      env: "RAPYD_SECRET_KEY",
      sensitive: true,
    },
    saltQty: {
      doc: "Rapyd API request signature salt",
      format: Number,
      default: 12,
      env: "RAPYD_SIGNATURE_SALT",
    },
    baseUrl: {
      doc: "Rapyd API base url",
      format: String,
      default: "https://sandboxapi.rapyd.net/",
      env: "RAPYD_BASE_URL",
    },
  },
});

export default configuration;
