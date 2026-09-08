// Service worker for full offline support. localStorage alone (the earlier
// approach) only covers the codes.json *data* — it does nothing for the
// HTML/CSS/JS "shell" itself. Without this, opening the installed app after
// weeks fully offline could still fail at the network level before any of
// that data-layer logic ever runs. This worker caches the shell (this site's
// own files + the Tailwind/Alpine CDN scripts they depend on) so the app
// boots from Cache Storage with zero network, then opportunistically caches
// anything else it sees (op-icons.json, the remote codes.json, etc.) via a
// stale-while-revalidate strategy: serve the cached copy instantly, refetch
// in the background to keep it fresh for next time.
const CACHE_NAME = 'banca-remota-v1';

const PRECACHE_URLS = [
  '/',
  '/dial',
  '/style.css',
  '/app.js',
  '/op-icons.json',
  '/favicon.ico',
  '/assets/icon-black.png',
  '/assets/icon-white.png',
  '/assets/banks/bpa-icon.svg',
  '/assets/banks/bandec-icon.svg',
  '/assets/banks/bm-icon.svg',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Per-URL try/catch: cleanUrls redirects, a flaky CDN, or a renamed
    // asset shouldn't sink the whole install (cache.addAll is all-or-nothing).
    await Promise.all(PRECACHE_URLS.map(async (url) => {
      try {
        const isCrossOrigin = new URL(url, self.location.origin).origin !== self.location.origin;
        // cache.add()/addAll() throw on an opaque response by spec — the
        // only way in is a manual fetch + cache.put(), which has no such
        // restriction. Needed for cross-origin CDN URLs with no
        // Access-Control-Allow-Origin header (e.g. cdn.tailwindcss.com),
        // where a no-cors fetch is the only kind that succeeds at all.
        const requestOrUrl = isCrossOrigin ? new Request(url, { mode: 'no-cors' }) : url;
        const response = await fetch(requestOrUrl);
        await cache.put(requestOrUrl, response);
      } catch (err) {
        console.warn('[sw] precache failed for', url, err);
      }
    }));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const networkFetch = fetch(request).then((response) => {
    // Opaque (cross-origin, no-cors) responses are still cacheable/servable —
    // we just can't inspect their status, so cache them optimistically.
    if (response && (response.ok || response.type === 'opaque')) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);

  if (cached) {
    networkFetch; // refresh in the background, don't block the response
    return cached;
  }
  return (await networkFetch) || new Response('Sin conexión y sin copia en caché.', {
    status: 503,
    statusText: 'Offline',
  });
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(staleWhileRevalidate(event.request));
});
