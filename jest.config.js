const nextJest = require("next/jest");

const createJestConfig = nextJest();
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
  setupFilesAfterEnv: ["./jest.setup.js"],
});

module.exports = jestConfig;
