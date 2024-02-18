const addResourcesToCache = async (resources) => {
	const cache = await caches.open('v1');
	await cache.addAll(resources);
};

// The install event is generally used to populate your browser's offline caching capabilities with the assets you need to run your app offline. To do this, we use Service Worker's storage API — cache — a global object on the service worker that allows us to store assets delivered by responses, and keyed by their requests. This API works in a similar way to the browser's standard cache, but it is specific to your domain. The contents of the cache are kept until you clear them.
self.addEventListener('install', (event) => {
	event.waitUntil(
		addResourcesToCache([
			'/',
			'/index.html',
			'/css/style.css',
			'/js/index.js',
			//'/images/beer.jpg',
			//'https://api.sampleapis.com/beers/ale',
		])
	);
});

// Offline-first. With an offline-first approach, you check for a requested asset in the service worker cache first. If it’s not found, you send the request to the network.
self.addEventListener('fetch', function (event) {
	// Check the cache first
	// If it's not found, send the request to the network
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});

// Network-first. With a network-first approach, you pass along requests to the network. If the request isn’t found, or there’s no network connectivity, you then look for the request in the service worker cache.
/* 
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
				console.log('error: ' + error);
				const response = await caches.match(event.request);
				return response || fetch(event.request);
			})
	);
});
*/
