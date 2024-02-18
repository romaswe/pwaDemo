const cacheName = 'v1';

const addResourcesToCache = async (resources) => {
	const cache = await caches.open(cacheName);
	await cache.addAll(resources);
};

// The install event is generally used to populate your browser's offline caching capabilities with the assets you need to run your app offline. To do this, we use Service Worker's storage API — cache — a global object on the service worker that allows us to store assets delivered by responses, and keyed by their requests. This API works in a similar way to the browser's standard cache, but it is specific to your domain. The contents of the cache are kept until you clear them.
self.addEventListener('install', (event) => {
	event.waitUntil(
		addResourcesToCache([
			'/',
			'/index.html',
			'/offline.html',
			'/css/style.css',
			'/js/index.js',
			'/images/beer.jpg',
			'/images/cider.jpg',
			'https://api.sampleapis.com/beers/ale',
		])
	);
});

// Offline-first. With an offline-first approach, you check for a requested asset in the service worker cache first. If it’s not found, you send the request to the network.
/*
self.addEventListener('fetch', function (event) {
	const url = new URL(event.request.url);

	// serve the cider JPG from the cache if the request is
	// same-origin and the path is '/images/beer.jpg'
	if (url.origin == location.origin && url.pathname == '/images/beer.jpg') {
		event.respondWith(caches.match('/images/cider.jpg'));
	}

	// Check the cache first
	// If it's not found, send the request to the network
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});
*/

// Network-first. With a network-first approach, you pass along requests to the network. If the request isn’t found, or there’s no network connectivity, you then look for the request in the service worker cache.

self.addEventListener('fetch', function (event) {
	// Send the request to the network first
	// If it's not found, look in the cache
	event.respondWith(
		fetch(event.request)
			.then(function (response) {
				console.log('response: ' + response);
				return response;
			})
			.catch(async function (error) {
				console.log('error:');
				console.log(error);

				const response = await caches.match(event.request);
				const offlineResponse = await caches.match('/offline.html');
				// if whe dont find a cache match we return the offline response
				return response || offlineResponse;
			})
	);
});

self.addEventListener('activate', (event) => {
	// Remove old caches
	event.waitUntil(
		(async () => {
			const keys = await caches.keys();
			return keys.map(async (cache) => {
				if (cache !== cacheName) {
					console.log('Service Worker: Removing old cache: ' + cache);
					return await caches.delete(cache);
				}
			});
		})()
	);
});
