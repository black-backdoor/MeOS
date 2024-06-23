/* ----------- EVENT LOGS ----------- */
self.addEventListener("install", function(event) {
    console.debug("%cService Worker: %cInstalled", "color: lightblue", "color: green");
});

self.addEventListener("activate", function(event) {
    console.log("%cService Worker: %cActivated", "color: lightblue", "color: inherit");
});




/* ----------- LIMIT CACHE ----------- */
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size) {
                console.debug(`%cService Worker: %cCache Size ${keys.length} now removing, max ${size}`, "color: lightblue", "color: inherit");
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
}



/* ----------- GET & CACHE OFFLINE PAGE ----------- */

const offlineCacheName = 'site-offline-v0.1';
const offlineCacheAssets = [
  '/fallback.html'
];


const dynamicCacheName = 'site-dynamic-v0.1';



/* Cache the offline page assets when the service worker is installed */
self.addEventListener("install", function(event) {
    console.debug(`%cService Worker: %cCache Offline Page to ${offlineCacheName} started`, "color: lightblue", "color: inherit");
    event.waitUntil(
        /* wait until the cache is open and add all the offline page assets */
        caches.open(offlineCacheName).then(cache => {
            cache.addAll(offlineCacheAssets);
        })
    );

    console.info(`%cService Worker: %cCache Offline Page to ${offlineCacheName} finished`, "color: lightblue", "color: inherit");
});


self.addEventListener("activate", function(event) {
    /* Delete all the old caches except the offline cache and the dynamic cache */
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== offlineCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            );
        })
    );

    console.info(`%cService Worker: %cDelete Old Caches except ${offlineCacheName} and ${dynamicCacheName} finished`, "color: lightblue", "color: inherit");
});



self.addEventListener("fetch", function(event) {
    event.respondWith(
        /* if the request is in the cache, return the cached response, otherwise fetch the request and cache it in the dynamic cache */
        caches.match(event.request).then(response => {

            /* if the request is in the cache, return the cached response */
            return response || fetch(event.request).then(fetchResponse => {

                /* if the request is not in the cache */
                return caches.open(dynamicCacheName).then(cache => {
                    /* fetch the request and cache it in the dynamic cache */
                    cache.put(event.request.url, fetchResponse.clone());

                    // limitCache Size to 100
                    limitCacheSize(dynamicCacheName, 100);

                    return fetchResponse;
                });
            })
        }).catch(() => {
            if(event.request.url.indexOf('/') > -1) {
                console.debug(`%cService Worker: %cFetch ${event.request.url} failed, now returning the offline page`, "color: lightblue", "color: inherit");
                return caches.match('/fallback.html');
            } 
        })
    )
});