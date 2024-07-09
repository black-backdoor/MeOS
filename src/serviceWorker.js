/*
    serviceWorker.js
    This serviceWorker is used to dynamically cache assets, as well as serve an offline fallback page.
    Cache is limited to 100 items.
*/


const CACHE_NAME_OFFLINE = 'offline-v0.3.0';
const CACHE_NAME_DYNAMIC = 'dynamic-v0.3.0';

const urlsToCache = [
    '/fallback.html',
];


/* ----------- LIMIT CACHE ----------- */
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size) {
                console.debug(`%c[Service Worker]%c Cache Size ${keys.length} now removing, max ${size}`, 'color: DodgerBlue', 'color: inherit');
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
};


// Install service worker and cache static assets
self.addEventListener('install', (event) => {
    console.debug("%c[Service Worker]%c Installed", 'color: DodgerBlue', 'color: green');
    event.waitUntil(
        caches.open(CACHE_NAME_OFFLINE)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate service worker and clean up old caches
self.addEventListener('activate', (event) => {
    console.log("%c[Service Worker]%c Activated", 'color: DodgerBlue', 'color: inherit');

    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();
            console.debug(`%c[Service Worker]%c Number of current caches: ${cacheNames.length}`, 'color: DodgerBlue', 'color: inherit');
            for (const cacheName of cacheNames) {
                const cache = await caches.open(cacheName);
                const requests = await cache.keys();
                console.debug(`%c[Service Worker]%c Cache: ${cacheName}, Number of entries: ${requests.length}`, 'color: DodgerBlue', 'color: inherit');
            }
        })()
    );

    const cacheWhiteList = [CACHE_NAME_OFFLINE, CACHE_NAME_DYNAMIC];
    console.debug(`%c[Service Worker]%c Allowed Caches: ${cacheWhiteList.join(', ')}`, 'color: DodgerBlue', 'color: inherit');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhiteList.includes(cacheName)) {
                        console.log(`%c[Service Worker]%c Deleting cache ${cacheName}`, 'color: DodgerBlue', 'color: red');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event: Serve from cache or fetch from network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Do not cache service worker
                if(event.request.url.includes('serviceWorker.js')) { return; }

                // Clone the request for fetch and cache separately
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest)
                    .then((response) => {
                        // Check if valid response received
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response for caching
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME_DYNAMIC)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        // Limit the cache size
                        limitCacheSize(CACHE_NAME_DYNAMIC, 100);
                        return response;
                    })
                    .catch(() => {
                        // Offline fallback
                        return caches.open(CACHE_NAME_OFFLINE)
                            .then((cache) => {
                                return cache.match('/fallback.html');
                            });
                    });
            })
    );
});
