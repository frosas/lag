/* eslint-disable no-console */

const util = require('../util');

const debug = (...args) => console.log('[Service Worker]', ...args);

const isCacheableRequest = request =>
    request.method === 'GET' &&
    !new URL(request.url).search.match(/[?&]nocache[&$]/);

self.addEventListener('install', () => debug('Installed'));

self.addEventListener('activate', () => debug('Activated'));

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
        return response;
    });

    // Caching approach:
    // - Return the network response if it succeeded in a timely fashion, or
    // - Return the cached resource if available, or
    // - Return the network response
    event.respondWith(util.timeout(1000 /* ms */, responsePromise).catch(error => {
        fetchDebug(error);
        return caches.match(event.request).then(cachedResponse => {
            fetchDebug('Cached response', cachedResponse);
            return cachedResponse || responsePromise;
        });
    }));
});
