if (process.env.NODE_ENV === "production") {
  const { init: initSentry } = require("@sentry/browser");
  initSentry({
    dsn: "https://a7399e1672354e7589a0fa0895268ca0@sentry.io/3593031"
  });
}

// Avoids the "All files must be modules when the '--isolatedModules' flag is
// provided." error. See https://stackoverflow.com/questions/56577201/why-is-isolatedmodules-error-fixed-by-any-import
export {};
