const CACHE_NAME = "verse-quiz-v16";

const APP_SHELL = [
    "./",
    "./index.html",
    "./style.css",
    "./sketch.js",
    "./manifest.webmanifest",
    "./libraries/p5.min.js",
    "./libraries/p5.sound.min.js",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(APP_SHELL);
        }).then(function () {
            return self.skipWaiting();
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

self.addEventListener("fetch", function (event) {
    if (event.request.method !== "GET") {
        return;
    }

    const requestURL = new URL(event.request.url);
    if (requestURL.origin !== self.location.origin) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(function (cachedResponse) {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request).then(function (networkResponse) {
                if (networkResponse && networkResponse.ok) {
                    const responseCopy = networkResponse.clone();
                    caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(event.request, responseCopy);
                    });
                }
                return networkResponse;
            }).catch(function () {
                if (event.request.mode === "navigate") {
                    return caches.match("./index.html");
                }
                throw new Error("Offline and resource was not cached.");
            });
        })
    );
});
