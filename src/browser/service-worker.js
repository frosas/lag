/* eslint-disable no-console */

const util = require('../util');

const debug = (...args) => console.log('[Service Worker]', ...args);

const isCacheableRequest = request =>
    request.method === 'GET' &&
    !new URL(request.url).search.match(/[?&]nocache[&$]/);

self.addEventListener('install', () => debug('Installed'));

self.addEventListener('activate', () => debug('Activated'));

// From http://www.nngroup.com/articles/response-times-3-important-limits/: "1.0
// second is about the limit for the user's flow of thought to stay uninterrupted,
// even though the user will notice the delay."
const MAX_ACCEPTABLE_RESPONSE_TIME = 1000; // ms

let nextFetchId = 1;

self.addEventListener('fetch', event => {
    const fetchId = nextFetchId++;
    const fetchDebug = (...args) => debug('[Fetch #' + fetchId + ']', ...args);

    fetchDebug(event.request);

    if (!isCacheableRequest(event.request)) {
        fetchDebug('Ignored (marked as not cacheable)');
        return;
    }

    var responsePromise = fetch(event.request);

    // Cache the request/response even if we already responded to the fetch. This
    // way, next time it will be readily available from the cache.
    responsePromise.then(response => {
        fetchDebug(response);
        const responseClone = response.clone();
        caches.open('v1').then(cache =>
            cache.put(event.request, responseClone).
                then(() => fetchDebug('Cached'))
        );
    });

    // Caching strategy: use the network response unless it's taking too long
    // and there's a cached response available.
    event.respondWith(
        util.timeout(MAX_ACCEPTABLE_RESPONSE_TIME, responsePromise).catch(error => {
            fetchDebug(error);
            return caches.match(event.request).then(cachedResponse => {
                fetchDebug('Cached response', cachedResponse);
                return cachedResponse || responsePromise;
            });
        })
    );
});
