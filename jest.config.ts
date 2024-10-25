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
  collectCoverage: true,
  collectCoverageFrom: [
    "./components/**{js,jsx,ts,tsx}", // Adjust this pattern to match your project structure
    "./app/**/page.{js,jsx,ts,tsx}", // Adjust this pattern to match your project structure
    "!./**/*.d.ts", // Exclude type declaration files (for TypeScript projects)
    "!./*.ts", // Exclude specific files if needed
  ],
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
