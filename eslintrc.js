module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "next/core-web-vitals", // For Next.js specific linting rules
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": ["error"],
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/anchor-is-valid": "off", // Next.js handles this with its Link component
    "react/prop-types": "off", // Disable prop-types as we use TypeScript for type checking
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
