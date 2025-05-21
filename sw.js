const CACHE_NAME = 'offline-cache-v1';
const OFFLINE_URL = 'offline.html';

const PRECACHE_ASSETS = [
  '/',
  'index.html',
  'offline.html',
  'styles.css',
  'JS/clock.js',
  'JS/search.js',
  'projects/2048/index.html',
  'projects/2048/thumb.png',
  'projects/tinyfishing/index.html',
  'projects/tinyfishing/icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then(response => response || caches.match(OFFLINE_URL))
    )
  );
});
