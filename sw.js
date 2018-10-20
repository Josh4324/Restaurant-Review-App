var CACHE_NAME = 'restaurant-cache-v2';
var urlsToCache = [
  '/Restaurant-Review-App/',
  '/Restaurant-Review-App/restaurant.html',
  '/Restaurant-Review-App/css/styles.css',
  '/Restaurant-Review-App/css/responsive.css',
  '/Restaurant-Review-App/data/restaurants.json',
  '/Restaurant-Review-App/js/main.js',
  '/Restaurant-Review-App/js/restaurant_info.js',
  '/Restaurant-Review-App/js/dbhelper.js',
  '/Restaurant-Review-App/img/1.jpg',
  '/Restaurant-Review-App/img/2.jpg',
  '/Restaurant-Review-App/img/3.jpg',
  '/Restaurant-Review-App/img/4.jpg',
  '/Restaurant-Review-App/img/5.jpg',
  '/Restaurant-Review-App/img/6.jpg',
  '/Restaurant-Review-App/img/7.jpg',
  '/Restaurant-Review-App/img/8.jpg',
  '/Restaurant-Review-App/img/9.jpg',
  '/Restaurant-Review-App/img/10.jpg',
  '/Restaurant-Review-App/img/fork.png',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }


        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
