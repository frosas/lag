/* eslint-disable no-console */

const { timeout } = require("../universal/util");

let isDebugEnabled;

const debug = (...args) => {
  if (isDebugEnabled) console.log("[Service Worker]", ...args);
};

const isCacheableRequest = request => {
  const url = new URL(request.url);
  return (
    request.method === "GET" &&
    !url.search.match(/[?&]nocache(&|$)/) &&
    url.protocol.match(/^https?:/)
  );
};

self.addEventListener("install", event => {
  debug("Installing...");
  event.waitUntil(self.skipWaiting().then(() => debug("Installed")));
});

self.addEventListener("activate", event => {
  debug("Activating...");
  event.waitUntil(self.clients.claim().then(() => debug("Activated")));
});

// From http://www.nngroup.com/articles/response-times-3-important-limits/: "1.0
// second is about the limit for the user's flow of thought to stay uninterrupted,
// even though the user will notice the delay."
const MAX_ACCEPTABLE_RESPONSE_TIME = 1000; // ms

let nextFetchId = 1;

self.addEventListener("fetch", event => {
  const fetchId = (nextFetchId += 1);
  const fetchDebug = (...args) => debug(`[Fetch #${fetchId}]`, ...args);

  fetchDebug(event.request);

  if (!isCacheableRequest(event.request)) {
    fetchDebug("Ignored (marked as not cacheable)");
    return;
  }

  const whenResponse = fetch(event.request);

  // Cache the request/response
  whenResponse.then(response => {
    fetchDebug(response);
    const responseClone = response.clone();
    caches.open("v1").then(cache => {
      cache.put(event.request, responseClone).then(() => fetchDebug("Cached"));
    });
  });

  // Caching strategy: use the network response unless it's taking too long
  // and there's a cached response available.
  event.respondWith(
    timeout(MAX_ACCEPTABLE_RESPONSE_TIME, whenResponse).catch(error => {
      fetchDebug(error);
      return caches.match(event.request).then(cachedResponse => {
        fetchDebug("Cached response", cachedResponse);
        return cachedResponse || whenResponse;
      });
    })
  );
});

self.addEventListener("message", event => {
  switch (event.data) {
    case "toggleDebugging":
      isDebugEnabled = !isDebugEnabled;
      break;
    default:
      throw new Error("Unknown message");
  }
});
