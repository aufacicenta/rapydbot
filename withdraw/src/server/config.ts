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
      default: 4100,
      env: "HTTP_PORT",
      arg: "port",
    },
    testPort: {
      doc: "The port to bind HTTP.",
      format: "port",
      default: 4101,
      env: "HTTP_TEST_PORT",
      arg: "test-port",
    },
    websocketPort: {
      doc: "The port to bind HTTP.",
      format: "port",
      default: 4102,
      env: "FUNDING_SERVICE_WEBSOCKET_PORT",
      arg: "websocket-port",
    },
  },
});

export default configuration;
