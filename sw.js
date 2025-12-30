/* sw.js — Service Worker V9 (Atualização Forçada para Carrossel)
   - Cache-then-network strategy
   - Força a limpeza de caches antigos imediatamente
*/
const CACHE_NAME = 'pbc-static-v9'; // <--- ALTERADO PARA V9 PARA FORÇAR ATUALIZAÇÃO
const PRECACHE_URLS = [
  '/', 
  '/index.html',
  '/style.css',
  '/app_final.js',
  '/data.js',
  '/quizzes.js',
  '/course.js',
  '/firebase-init.js'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Força o novo SW a assumir imediatamente, ignorando o antigo
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Tenta buscar os arquivos novos. Se falhar algum, não trava a instalação.
      return cache.addAll(PRECACHE_URLS.map(u => new Request(u, {cache: 'reload'}))).catch(err => {
          console.warn('Falha ao cachear alguns arquivos:', err);
      });
    })
  );
});

self.addEventListener('activate', event => {
  clients.claim(); // Assume o controle de todas as abas abertas imediatamente
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => {
        if (k !== CACHE_NAME) {
            console.log('Limpando cache antigo:', k);
            return caches.delete(k); // Apaga caches antigos (v8, v7...)
        }
      })
    ))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  // Estratégia: Network First (Tenta pegar do servidor; se falhar, pega do cache)
  // Isso garante que você veja as alterações mais rápido durante o desenvolvimento
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => caches.match(event.request)) // Se estiver offline, usa o cache
  );
});
