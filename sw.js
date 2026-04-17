// MapFlow Service Worker v1.0
const CACHE = 'mapflow-1.1';
const OFFLINE_URL = 'index.html';

// Assets to cache on install (critical for offline use)
const PRECACHE = [
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// ─── INSTALL ────────────────────────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll(PRECACHE);
    }).then(() => self.skipWaiting())
  );
});

// ─── ACTIVATE ───────────────────────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => clients.claim())
  );
});

// ─── FETCH ──────────────────────────────────────────────────────────────────
// Strategy: Network first for CDN resources, cache first for local files
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // CDN resources (xlsx.js, Google Fonts) — network with cache fallback
  if (url.hostname.includes('cdn.jsdelivr.net') || url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(CACHE).then(cache =>
        fetch(event.request)
          .then(response => { cache.put(event.request, response.clone()); return response; })
          .catch(() => cache.match(event.request))
      )
    );
    return;
  }

  // Local files — cache first, network fallback
  if (url.hostname === self.location.hostname || event.request.url.startsWith(self.registration.scope)) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
          return new Response('Offline', { status: 503 });
        });
      })
    );
  }
});

// ─── MESSAGE ────────────────────────────────────────────────────────────────
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
