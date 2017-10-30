module.exports = {
  env: { es6: true, commonjs: true },
  parserOptions: { ecmaVersion: 2017 },
  extends: ["eslint:recommended"],
  plugins: ["prettier"],
  rules: { "prettier/prettier": "error" }
};
