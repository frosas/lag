import { defineConfig } from "eslint/config"
import frosasConfig, { globals } from "@frosas/eslint-config"

export default defineConfig([
  ...frosasConfig,
  {
    languageOptions: { parserOptions: { ecmaVersion: 2020 } },
  },
  {
    files: ["*.{js,ts,tsx}"],
    languageOptions: { globals: globals.node },
  },
  {
    ignores: ["!**/.*.js", "dist/"],
  },
])
