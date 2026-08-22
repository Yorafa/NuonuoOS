module.exports = require("next/jest")()({
  moduleDirectories: ["<rootDir>", "node_modules"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["<rootDir>/test/playwright/"],
});
