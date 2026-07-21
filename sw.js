// sw.js - Service Worker Absensi IPM (Anti-Crash)
const CACHE_NAME = 'absensi-ipm-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Biarkan browser menangani network fetch secara native agar API Google Apps Script & Vercel tidak terganggu
self.addEventListener('fetch', (event) => {
  return;
});
