import frosasConfig from "@frosas/eslint-config"
import globals from "globals"
import { config } from "typescript-eslint"

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
