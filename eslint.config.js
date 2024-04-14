/* eslint-disable @typescript-eslint/no-var-requires */

const frosasConfig = require("@frosas/eslint-config")
const globals = require("globals")
const { default: tsEslint, config } = require("typescript-eslint")
const reactConfigRecommended = require("eslint-plugin-react/configs/recommended")

const reactConfig = config({
  files: ["**/*.{jsx,tsx}"],
  ...reactConfigRecommended,
  settings: {
    ...reactConfigRecommended.settings,
    react: {
      ...reactConfigRecommended.settings?.react,
      version: "detect",
    },
  },
})

const tsConfig = config(...tsEslint.configs.recommended, {
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
})

const jsConfig = config({
  languageOptions: { parserOptions: { ecmaVersion: 2020 } },
})

const nodeConfig = config({
  files: ["*.{js,ts,tsx}"],
  languageOptions: { globals: globals.node },
})

module.exports = config(
  ...frosasConfig,
  ...reactConfig,
  ...tsConfig,
  ...jsConfig,
  ...nodeConfig,
  { ignores: ["!**/.*.js", "dist/"] },
)
