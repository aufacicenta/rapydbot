module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 30000,
  verbose: true,
  silent: false,
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  setupFiles: ["<rootDir>/__test__/util/env-setup.ts"],
  globalTeardown: "<rootDir>/__test__/util/global-teardown.ts",
};
