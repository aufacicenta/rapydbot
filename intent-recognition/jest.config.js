module.exports = {
  roots: ["<rootDir>/src/__test__"],
  testMatch: ["**/*.test.ts"],
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 1200000,
  verbose: true,
  silent: false,
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
  setupFiles: ["<rootDir>/src/__test__/util/env-setup.ts"],
  globalTeardown: "<rootDir>/src/__test__/util/global-teardown.ts",
};
