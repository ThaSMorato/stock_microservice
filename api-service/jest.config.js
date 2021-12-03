/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  coverageReporters: ["json", "text", "lcov", "clover"],

  coverageThreshold: {
    global: {
      branch: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  maxWorkers: "50%",

  testEnvironment: "node",
  watchPathIgnorePatterns: ["node_modules"],
};
