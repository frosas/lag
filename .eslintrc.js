module.exports = {
  root: true,
  extends: ["@frosas/eslint-config"],
  parserOptions: { ecmaVersion: 2020, sourceType: "module" },
  env: { es6: true, node: true },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-var-requires": "off"
      }
    },
    {
      files: ["**/*.test.js"],
      env: { mocha: true }
    }
  ]
};
