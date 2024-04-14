const frosasConfig = require("@frosas/eslint-config")
const globals = require("globals")
const { config } = require("typescript-eslint")
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

const jsConfig = config({
  languageOptions: { parserOptions: { ecmaVersion: 2020 } },
})

const configFilesConfig = config({
  files: ["*.{js,ts,tsx}"],
  languageOptions: { globals: globals.node },
})

module.exports = config(
  ...frosasConfig,
  ...reactConfig,
  ...jsConfig,
  ...configFilesConfig,
  { ignores: ["!**/.*.js", "dist/"] },
)
