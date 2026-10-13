// Offline support. Bump VERSION whenever any file changes, so phones pick up the update.
const VERSION = 'ruchulu-v1';
const FILES = [
  './', 'index.html', 'recipes.js', 'fonts.css', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
  'pages/page-1.jpg', 'pages/page-2.jpg', 'pages/page-3.jpg',
  'fonts/caveat-latin-500-normal.woff2',
  'fonts/caveat-latin-700-normal.woff2',
  'fonts/crimson-text-latin-400-italic.woff2',
  'fonts/crimson-text-latin-400-normal.woff2',
  'fonts/crimson-text-latin-600-normal.woff2',
  'fonts/crimson-text-latin-700-normal.woff2',
  'fonts/noto-sans-telugu-telugu-400-normal.woff2',
  'fonts/noto-sans-telugu-telugu-600-normal.woff2',
  'fonts/noto-serif-telugu-latin-400-normal.woff2',
  'fonts/noto-serif-telugu-latin-600-normal.woff2',
  'fonts/noto-serif-telugu-latin-800-normal.woff2',
  'fonts/noto-serif-telugu-telugu-400-normal.woff2',
  'fonts/noto-serif-telugu-telugu-600-normal.woff2',
  'fonts/noto-serif-telugu-telugu-800-normal.woff2',
];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Network first (so new recipes show up), falling back to the saved copy when offline.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || (e.request.mode === 'navigate' ? caches.match('index.html') : undefined))));
});
