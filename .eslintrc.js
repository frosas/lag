module.exports = {
  root: true,
  extends: ["@frosas/eslint-config", "plugin:react/recommended"],
  parserOptions: { ecmaVersion: 2020, sourceType: "module" },
  env: { es6: true, node: true },
  settings: { react: { version: "detect" } },
  rules: {
    "react/prop-types": "off",
    "react/display-name": "off",
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        // TODO "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
    {
      files: ["**/*.test.ts"],
      env: { mocha: true },
    },
  ],
};
