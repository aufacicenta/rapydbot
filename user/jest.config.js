module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 30000,
  verbose: true,
  silent: false,
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
  setupFiles: ["<rootDir>/src/__test__/util/env-setup.ts"],
  globalTeardown: "<rootDir>/src/__test__/util/global-teardown.ts",
};
