// @ts-check

/** @type {import("@babel/core").ConfigFunction} */
module.exports = api => ({
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties"
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
        targets: (() => {
          switch (api.env()) {
            case "browser":
              return "defaults";
            case "node":
              return { node: true };
            default:
              throw new Error();
          }
        })()
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  sourceType: "unambiguous"
});
