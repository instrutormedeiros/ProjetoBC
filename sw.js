/* sw.js — Service Worker V11 (ATUALIZAÇÃO OBRIGATÓRIA) */

// MUDE DE 'pbc-static-v9' PARA 'pbc-static-v11'
const CACHE_NAME = 'pbc-static-v11'; 

const PRECACHE_URLS = [
  '/', 
  '/index.html',
  '/style.css',
  '/app_final.js',
  '/data.js',
  '/quizzes.js',
  '/course.js',
  '/firebase-init.js',
  '/manifest.json' 
  // Se tiver imagens no carrossel, adicione aqui, ex: '/assets/img/slide1.jpg'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Força a instalação imediata
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS.map(u => new Request(u, {cache: 'reload'})))
        .catch(err => console.warn('Aviso de cache:', err));
    })
  );
});

self.addEventListener('activate', event => {
  clients.claim(); 
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => {
        // Limpa qualquer cache que não seja o V11
        if (k !== CACHE_NAME) {
            console.log('Limpando cache antigo:', k);
            return caches.delete(k); 
        }
      })
    ))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => caches.match(event.request))
  );
});
