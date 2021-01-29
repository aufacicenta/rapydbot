module.exports = {
  roots: ["<rootDir>/src/__test__"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testTimeout: 30000,
};
