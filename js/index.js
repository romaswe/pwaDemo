async function logBeer() {
	console.log('Fetching beers...');
	const response = await fetch('https://api.sampleapis.com/beers/ale');
	const beers = await response.json();
	//console.log(beers);
	var list = document.getElementById('beerList');
	let displayList = [];
	if (list) {
		beers.forEach((item) => {
			if (displayList.length <= 10) {
				displayList.push(item.name);
				let li = document.createElement('li');
				li.innerText = item.name;
				list.appendChild(li);
			}
		});
	}
}

async function logWine() {
	console.log('Fetching wines...');
	const response = await fetch('https://api.sampleapis.com/wines/reds');
	const wines = await response.json();
	//console.log(wines);
	var list = document.getElementById('wineList');
	let displayList = [];
	if (list) {
		wines.forEach((item) => {
			if (displayList.length <= 10) {
				displayList.push(item.wine);
				let li = document.createElement('li');
				li.innerText = item.wine;
				list.appendChild(li);
			}
		});
	}
}

logBeer();
logWine();
