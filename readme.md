# PWA Demo

run with `npx http-server index.html`

## Workbox

[Google SW framework](https://web.dev/learn/pwa/workbox)

# Demo

## Manifest

[Manifest generator](https://manifest-gen.netlify.app/)

`<link rel="manifest" href="manifest.webmanifest" />`

```Json
{
  "name": "PWA-DEMO",
  "short_name": "PWA",
  "theme_color": "#50C878",
  "background_color": "#50C878",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/",
  "icons": []
}
```

## Service worker (Caching)

`index.html`

```Javascript
const registerServiceWorker = async () => {
				if ('serviceWorker' in navigator) {
					try {
						const registration =
							await navigator.serviceWorker.register('/sw.js', {
								scope: '/',
							});
						if (registration.installing) {
							console.log('Service worker installing');
						} else if (registration.waiting) {
							console.log('Service worker installed');
						} else if (registration.active) {
							console.log('Service worker active');
						}
					} catch (error) {
						console.error(`Registration failed with ${error}`);
					}
				}
			};

			registerServiceWorker();
```

`sw.js`

```Javascript
const addResourcesToCache = async (resources) => {
	const cache = await caches.open('v1');
	await cache.addAll(resources);
};

self.addEventListener('install', (event) => {
	event.waitUntil(
		addResourcesToCache([
			'/',
			'/index.html',
			'/css/style.css',
			'/js/index.js',
		])
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});
```

## Service worker (Serve changing)

```Javascript
const url = new URL(event.request.url);

	// serve the cider JPG from the cache if the request is
	// same-origin and the path is '/images/beer.jpg'
	if (url.origin == location.origin && url.pathname == '/images/beer.jpg') {
		event.respondWith(caches.match('/images/cider.jpg'));
	}
```

```Javascript
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
```

## Service worker (clear cache)

To prevent problems with caching Eg you have added new resources you want to cache, but the cache is not updated with it.
You should change your cache name and delete unused caches when you do changes to your resources.

```Javascript
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
```

## Service worker (notifications)

The showNotification() method of the ServiceWorkerRegistration interface creates a notification on an active service worker.

```Javascript
const sendButton = document.querySelector('#send-notification');
//const registration = await navigator.serviceWorker.getRegistration();

function showNotification() {
	console.log('clicked showNotification');
	Notification.requestPermission().then((result) => {
		if (result === 'granted') {
			console.log('Permission granted');
			createNotification();
		} else {
			if (Notification.permission !== 'denied') {
				Notification.requestPermission().then((result) => {
					if (result === 'granted') {
						console.log('Permission granted');
						createNotification();
					} else {
						console.log('Permission denied');
					}
				});
			}
		}
	});
}

function createNotification() {
	// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification#examples
	navigator.serviceWorker.getRegistration('/').then((registration) => {
		if (registration) {
			console.log('Found registration: ', registration);
			console.log(registration.ready);
			registration.showNotification('Vibration Sample', {
				body: 'Buzz! Buzz!', // Optional A string representing an extra content to display within the notification.
				icon: '../images/beer.jpg', // Optional A string containing the URL of an image to be used as an icon by the notification.
				vibrate: [200, 100, 200, 100, 200, 100, 200], // Optional A vibration pattern to run with the display of the notification. A vibration pattern can be an array with as few as one member. The values are times in milliseconds where the even indices (0, 2, 4, etc.) indicate how long to vibrate and the odd indices indicate how long to pause. For example, [300, 100, 400] would vibrate 300ms, pause 100ms, then vibrate 400ms.
				tag: 'vibration-sample', // Optional An ID for a given notification that allows you to find, replace, or remove the notification using a script if necessary.
			});
		} else {
			console.log('registration is null');
		}
	});
	// title The title that must be shown within the notification.
	// options Optional An object that allows configuring the notification.
}

sendButton.addEventListener('click', showNotification);
```

# Git commits

## Basic website

git checkout 9f70ab1

## Manifest added

git checkout 179a11b

## Caching

git checkout e8a4049

## Offline page

git checkout 4e92e91

## Clear cache

git checkout 4157bbf

## Notifications

git checkout ae0a69c
