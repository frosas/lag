import { initErrorTracking } from "./init"

// No browser tracing: it measures page loads, and its web-vitals instrumentation
// throws "document is not defined" in workers.
initErrorTracking()
