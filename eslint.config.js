const frosasConfig = require("@frosas/eslint-config")
const globals = require("globals")
const { config } = require("typescript-eslint")

const jsConfig = config({
  languageOptions: { parserOptions: { ecmaVersion: 2020 } },
})

const configFilesConfig = config({
  files: ["*.{js,ts,tsx}"],
  languageOptions: { globals: globals.node },
})

module.exports = config(...frosasConfig, ...jsConfig, ...configFilesConfig, {
  ignores: ["!**/.*.js", "dist/"],
})
