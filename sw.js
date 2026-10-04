/* Service worker: makes the app open with no connection.
 *
 * - The page itself is fetched from the network first (so an update you upload
 *   reaches people the next time they open the app online) and falls back to
 *   the saved copy when offline or slow.
 * - Everything else (icons, fonts) is served from the saved copy at once and
 *   refreshed quietly in the background.
 *
 * You normally never need to edit this file. Change CACHE only if you want to
 * throw away everything people have saved.
 */
const CACHE = 'zhuyin-v1';
const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
];
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function networkFirst(request, timeoutMs) {
  return new Promise((resolve) => {
    const fallback = () => caches.match(request, { ignoreSearch: true }).then((hit) => hit || caches.match('./index.html'));
    const timer = setTimeout(() => fallback().then((hit) => hit && resolve(hit)), timeoutMs);
    fetch(request).then((response) => {
      clearTimeout(timer);
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then((c) => c.put('./index.html', copy));
      }
      resolve(response);
    }).catch(() => {
      clearTimeout(timer);
      fallback().then((hit) => resolve(hit || Response.error()));
    });
  });
}

function staleWhileRevalidate(request) {
  return caches.open(CACHE).then((cache) =>
    cache.match(request).then((hit) => {
      const refresh = fetch(request).then((response) => {
        if (response && (response.ok || response.type === 'opaque')) cache.put(request, response.clone());
        return response;
      });
      if (hit) { refresh.catch(() => {}); return hit; }
      return refresh;
    })
  );
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, 3000));
  } else if (url.origin === self.location.origin || FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
