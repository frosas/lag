/* eslint-disable no-console */

const debug = (...args) => console.log('[Service Worker]', ...args);

const isCacheableRequest = request =>
    request.method === 'GET' &&
    !new URL(request.url).search.match(/[?&]nocache[&$]/);

const timeout = (duration, promise) => Promise.race([
    promise,
    new Promise((resolve, reject) => setTimeout(
        () => reject(new Error(`Timed out after ${duration} ms`)),
        duration
    )),
]);

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

    event.respondWith(
        timeout(1000, fetch(event.request)).then(
            response => {
                fetchDebug(response);
                const responseClone = response.clone();
                caches.open('v1').then(cache =>
                    cache.put(event.request, responseClone).
                        then(() => fetchDebug('Cached'))
                );
                return response;
            },
            error => {
                fetchDebug(error);
                return caches.match(event.request).then(cachedResponse => {
                    fetchDebug('Cached response', cachedResponse);
                    return cachedResponse || error;
                });
            }
        )
    );
});
