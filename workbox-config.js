module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{yml,css,ico,jpg,html,js,webmanifest,json,md}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};