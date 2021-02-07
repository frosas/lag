import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://a7399e1672354e7589a0fa0895268ca0@sentry.io/3593031",
  environment: process.env.NODE_ENV,
  autoSessionTracking: false, // Don't require the GDPR prompt
});
