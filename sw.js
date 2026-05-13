const CACHE_NAME = "la-huerta-shell-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./Public/Inicio.png",
  "./Public/registro.png",
  "./Public/codigo.png",
  "./Public/Pantalla_Producto-01.png",
  "./Public/Group 13.png",
  "./Public/marco.png",
  "./Public/points.png",
  "./Public/Recurso 2 1.png",
  "./Public/Recurso 3 2.png",
  "./Public/Recurso 4 1.png",
  "./Public/Recurso 5 2.png",
  "./Public/Recurso 6 1.png",
  "./Public/Maiz.png",
  "./Public/pwa-icon-192.png",
  "./Public/pwa-icon-512.png",
  "./Public/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        return networkResponse;
      });
    })
  );
});
