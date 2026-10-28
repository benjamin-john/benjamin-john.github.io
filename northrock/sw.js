// New tab pages open constantly, so everything is answered from the local cache first.
// The page itself is refreshed in the background, so an edit shows up on the next new tab.
// Bump the cache name when an icon file is replaced.

const CACHE = 'northrock-v1';

const PRECACHE = [
  './',
  'n.svg',
  'icons/salesforce.png', 'icons/zoom.png', 'icons/outlook.png', 'icons/sharepoint.png',
  'icons/asana.png', 'icons/github.png', 'icons/note.png', 'icons/ukg.png',
  'icons/lattice.png', 'icons/blackdiamond.png', 'icons/docusign.png', 'icons/formstack.png',
  'icons/compliancealpha.png', 'icons/mulesoft.png', 'icons/own.jpg', 'icons/1password.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isPage  = url.origin === location.origin && url.pathname.startsWith('/northrock/');
  const isFont  = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!isPage && !isFont) return;

  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(req, { ignoreSearch: isPage });
    const fresh = fetch(req).then(res => {
      if (res.ok) cache.put(req, res.clone());
      return res;
    });
    if (!cached) return fresh;
    // Fonts never change at a given URL; the page and icons get a background refresh.
    if (isPage) e.waitUntil(fresh.catch(() => {}));
    return cached;
  }));
});
