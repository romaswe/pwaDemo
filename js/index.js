async function logBeer() {
	console.log('Fetching beers...');
	const response = await fetch('https://api.sampleapis.com/beers/ale');
	const beers = await response.json();
	console.log(beers);
	var list = document.getElementById('beerList');
	let displayList = [];
	beers.forEach((item) => {
		if (displayList.length <= 10) {
			displayList.push(item.name);
			let li = document.createElement('li');
			li.innerText = item.name;
			list.appendChild(li);
		}
	});
}

logBeer();
