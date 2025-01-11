const cacheName = "pwa-demo-app-v1";

const appShellFiles = [
    "index.html",
    "app.js",
    "images/astronaut-crop1.jpg",
    "images/astronaut-crop2.jpg",
    "images/astronaut.jpg",
    "styles/style.css",
    "styles/mobile.css",
    "icons/favicon.ico",
    "icons/icon-32.png",
    "icons/icon-64.png",
    "icons/icon-96.png",
    "icons/icon-128.png",
    "icons/icon-167.png",
    "icons/icon-192.png",
    "icons/icon-256.png",
    "icons/icon-512.png",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches
            .open(cacheName)
            .then(function (resolve) {
                resolve.addAll(appShellFiles);
            })
            .catch(function (error) {
                console.log(error);
            })
    );
});

self.addEventListener("fetch", function (event) {
    const { request } = event;
    if (
        request &&
        (request.url.startsWith("http:") || request.url.startsWith("https:"))
    ) {
        event.respondWith(
            caches
                .open(cacheName)
                .then(function (cache) {
                    return cache.match(request).then(function (cachedResponse) {
                        return (
                            cachedResponse ||
                            fetch(request).then(function (response) {
                                const responseToCache = response.clone();
                                cache.put(request, responseToCache);
                                return response;
                            })
                        );
                    });
                })
                .catch(function (error) {
                    console.log(error);
                })
        );
    }
});
