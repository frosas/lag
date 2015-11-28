/* eslint-disable no-console */

const debug = (...args) => console.log('[Service Worker]', ...args);

self.addEventListener('install', () => debug('Installed'));

self.addEventListener('activate', () => debug('Activated'));

let nextFetchId = 1;

self.addEventListener('fetch', event => {
    const fetchId = nextFetchId++;
    const fetchDebug = (...args) => debug('[Fetch #' + fetchId + ']', ...args);
    fetchDebug(event.request);
    if (new URL(event.request.url).search.match(/[?&]nocache[&$]/)) {
        fetchDebug('Ignored (marked as not cacheable)');
        return;
    }
    event.respondWith(
        fetch(event.request).then(
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
                debug(error);
                return caches.match(event.request).then(cachedResponse => {
                    debug('Cached response', cachedResponse);
                    return cachedResponse || error;
                });
            }
        )
    );
});
