import frosasConfig, { config, globals } from "@frosas/eslint-config"

const jsConfig = config({
  languageOptions: { parserOptions: { ecmaVersion: 2020 } },
})

const configFilesConfig = config({
  files: ["*.{js,ts,tsx}"],
  languageOptions: { globals: globals.node },
})

export default config(...frosasConfig, ...jsConfig, ...configFilesConfig, {
  ignores: ["!**/.*.js", "dist/"],
})
