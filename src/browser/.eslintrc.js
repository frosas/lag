/* eslint-env node */

module.exports = {
  env: { node: false, browser: true },
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: { jsx: true }
  },
  plugins: ["react"],
  rules: {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error"
  }
};
