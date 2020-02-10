module.exports = {
  plugins: ["@babel/plugin-syntax-dynamic-import"],
  presets: [
    ["@babel/preset-env", { useBuiltIns: "usage", corejs: 3 }],
    "@babel/preset-react"
  ],
  sourceType: "unambiguous"
};
