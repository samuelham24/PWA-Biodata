const CACHE_NAME = "submission1-v15";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/contact.html",
  "/pages/gallery.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/icon.png",
  "img/photo2.png",
  "img/iot.jpg",
  "img/gmail.png",
  "img/gal1.jpg",
  "img/gal2.jpg",
  "img/linkedin.jpg",
  "img/1.png",
  "img/2.png",
  "img/3.png",
  "img/4.png"

];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});