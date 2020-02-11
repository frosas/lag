module.exports = {
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties"
  ],
  presets: [
    ["@babel/preset-env", { useBuiltIns: "usage", corejs: 3 }],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  sourceType: "unambiguous"
};
