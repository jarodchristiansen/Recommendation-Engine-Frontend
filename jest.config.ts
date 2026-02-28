import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "babel",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^msw/node$": "<rootDir>/node_modules/msw/lib/node/index.js",
    "^@mswjs/interceptors/ClientRequest$":
      "<rootDir>/node_modules/@mswjs/interceptors/lib/node/interceptors/ClientRequest/index.cjs",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/page.{js,jsx,ts,tsx}",
    "./app/api/**/*.ts",
    "./app/lib/**/*.ts",
    "!./**/*.d.ts",
    "!./**/*.test.{js,jsx,ts,tsx}",
    "!./**/*.spec.{js,jsx,ts,tsx}",
    "!./**/__mocks__/**",
  ],
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
