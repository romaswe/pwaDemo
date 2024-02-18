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
