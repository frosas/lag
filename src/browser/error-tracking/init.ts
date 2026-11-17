import * as Sentry from "@sentry/browser"

/** Settings shared by every context (page, ping worker, service worker) */
export const initErrorTracking = (options: Sentry.BrowserOptions = {}) =>
  Sentry.init({
    dsn: "https://a7399e1672354e7589a0fa0895268ca0@sentry.io/3593031",
    environment: process.env.NODE_ENV,
    ...options,
  })
