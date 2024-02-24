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
