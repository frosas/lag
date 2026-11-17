import * as Sentry from "@sentry/browser"
import { initErrorTracking } from "./init"

initErrorTracking({
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
})
