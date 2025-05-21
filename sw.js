const CACHE_NAME = 'offline-cache-v2';
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
  'projects/tinyfishing/icon.png',
  'projects/eurocup/index.html',
  'projects/tinyfishing/html5game/TinyFishing.js',
  'projects/tinyfishing/html5game/TinyFishing_texture_0.png',
  'projects/tinyfishing/html5game/TinyFishing_texture_1.png',
  'projects/tinyfishing/html5game/TinyFishing_texture_2.png',
  'projects/tinyfishing/html5game/TinyFishing_texture_3.png',
  'projects/tinyfishing/html5game/TinyFishing_texture_4.png',
  'projects/tinyfishing/html5game/aqh_GameAnalytics.js',
  'projects/tinyfishing/html5game/bqh_GameAnalyticsExt.js',
  'projects/tinyfishing/html5game/cqh_djs.js',
  'projects/tinyfishing/html5game/eqh_gamesnacks.js',
  'projects/tinyfishing/html5game/load.png',
  'projects/tinyfishing/html5game/snd_boost.ogg',
  'projects/tinyfishing/html5game/snd_butClick.ogg',
  'projects/tinyfishing/html5game/snd_buyForCoins.ogg',
  'projects/tinyfishing/html5game/snd_buyForCoins2.ogg',
  'projects/tinyfishing/html5game/snd_catchPop.ogg',
  'projects/tinyfishing/html5game/snd_catchPopGolden.ogg',
  'projects/tinyfishing/html5game/snd_coinAdded.ogg',
  'projects/tinyfishing/html5game/snd_coinCollect.ogg',
  'projects/tinyfishing/html5game/snd_coins.ogg',
  'projects/tinyfishing/html5game/snd_fishReel.ogg',
  'projects/tinyfishing/html5game/snd_levComplBest.ogg',
  'projects/tinyfishing/html5game/snd_musicBackground.ogg',
  'projects/tinyfishing/html5game/snd_openPrize.ogg',
  'projects/tinyfishing/html5game/snd_pop.ogg',
  'projects/tinyfishing/html5game/snd_splash1.ogg',
  'projects/tinyfishing/html5game/snd_splash2.ogg',
  'projects/tinyfishing/html5game/snd_startFishing.ogg',
  'projects/tinyfishing/html5game/snd_swoosh.ogg',
  'projects/tinyfishing/html5game/snd_unlockHook.ogg',
  'projects/tinyfishing/html5game/snd_upgradeSnd.ogg',
  'projects/tinyfishing/html5game/snd_water.ogg',
  'projects/tinyfishing/html5game/tph_PokiExt.js',
  'projects/tinyfishing/html5game/trads.csv',
  'projects/tinyfishing/html5game/uph_cookieManager.js',
  'projects/tinyfishing/html5game/vph_HTML5Func.js',
  'projects/tinyfishing/html5game/wph_API_Fullscreen.js',
  'projects/tinyfishing/html5game/xph_external.js',
  'projects/tinyfishing/html5game/zph_djl.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then(response =>
        response || caches.match(OFFLINE_URL)
      )
    )
  );
});
