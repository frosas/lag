/// <reference lib="webworker" />

/* eslint-disable no-console */

import "../../error-tracking"
import { timeout } from "../../../universal/util"

// TODO Make worker a ServiceWorker after finding proper typings for ServiceWorker
const worker = self as any

let isDebugEnabled = false

const debug = (...args: any[]) => {
  if (isDebugEnabled) console.log("[Service Worker]", ...args)
}

const isCacheableRequest = (request: Request) => {
  const url = new URL(request.url)
  return (
    request.method === "GET" &&
    !url.search.match(/[?&]nocache(&|$)/) &&
    url.protocol.match(/^https?:/)
  )
}

worker.addEventListener("install", (event: ExtendableEvent) => {
  debug("Installing...")
  event.waitUntil(worker.skipWaiting().then(() => debug("Installed")))
})

worker.addEventListener("activate", (event: ExtendableEvent) => {
  debug("Activating...")
  event.waitUntil(worker.clients.claim().then(() => debug("Activated")))
})

// From http://www.nngroup.com/articles/response-times-3-important-limits/: "1.0
// second is about the limit for the user's flow of thought to stay uninterrupted,
// even though the user will notice the delay."
const MAX_ACCEPTABLE_RESPONSE_TIME = 1000 // ms

let nextFetchId = 1

worker.addEventListener("fetch", (event: FetchEvent) => {
  const fetchId = (nextFetchId += 1)
  const fetchDebug = (...args: any[]) => debug(`[Fetch #${fetchId}]`, ...args)

  fetchDebug(event.request)

  if (!isCacheableRequest(event.request)) {
    fetchDebug("Ignored (marked as not cacheable)")
    return
  }

  const whenResponse = fetch(event.request)

  // Cache the request/response
  whenResponse.then((response) => {
    fetchDebug(response)
    const responseClone = response.clone()
    caches.open("v1").then((cache) => {
      cache.put(event.request, responseClone).then(() => fetchDebug("Cached"))
    })
  })

  // Caching strategy: use the network response unless it's taking too long
  // and there's a cached response available.
  event.respondWith(
    timeout(MAX_ACCEPTABLE_RESPONSE_TIME, whenResponse).catch((error) => {
      fetchDebug(error)
      return caches.match(event.request).then((cachedResponse) => {
        fetchDebug("Cached response", cachedResponse)
        return cachedResponse || whenResponse
      })
    }),
  )
})

worker.addEventListener("message", (event: ExtendableMessageEvent) => {
  switch (event.data) {
    case "toggleDebugging":
      isDebugEnabled = !isDebugEnabled
      break
    default:
      throw new Error("Unknown message")
  }
})
