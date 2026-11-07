// Service Worker com Cache Inteligente para Android e Navegadores Web
// Armazena imagens, fontes e arquivos estáticos localmente para carregamento instantâneo (0ms)

const CACHE_NAME = 'totens-honda-v3';

// Recursos essenciais para pré-carregar na instalação
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/assets/favicon.svg',
  '/assets/logos/honda.svg',
  '/assets/elements/folha.webp',
  '/assets/elements/folha-l.webp',
  '/assets/elements/folha-r.webp',
  '/assets/bg/slice-quiz.webp',
  '/assets/bg/slice-hub.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('[SW] Pré-cache parcial (recursos serão cacheados sob demanda):', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Removendo cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Apenas requisições GET são cacheadas
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // NUNCA cachear requisições para a API (dados sempre em tempo real do Firestore)
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Verifica se é um arquivo estático (imagens, fontes, css, js)
  const isStaticAsset =
    url.pathname.startsWith('/assets/') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    /\.(webp|png|jpg|jpeg|svg|gif|ico|woff2|woff|ttf|css|js)$/i.test(url.pathname);

  if (isStaticAsset) {
    // ESTRATÉGIA CACHE-FIRST:
    // 1. Se já está no cache local do dispositivo, entrega imediatamente (0ms de latência)
    // 2. Se não está, busca da rede, grava no cache local para as próximas vezes e retorna
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          // Se estiver offline e não tiver no cache
          return cachedResponse || new Response('Offline', { status: 503 });
        }
      })
    );
    return;
  }

  // ESTRATÉGIA PARA NAVEGAÇÃO HTML / ROTAS SPA:
  // Rede primeiro, com fallback transparente para o cache do index.html (suporte offline)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);
          const cached = await cache.match(request);
          return cached || (await cache.match('/index.html')) || (await cache.match('/'));
        })
    );
    return;
  }

  // Fallback padrão para outros recursos GET
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        })
      );
    })
  );
});
