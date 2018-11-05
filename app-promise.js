const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help','h')
	.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `http://www.mapquestapi.com/geocoding/v1/address?key=jAr8wJxTbwFSTsm6qVA7HS13Cda8DUTi&location=${encodedAddress}`;

axios.get(geocodeURL).then((response)=> {
	if(response.data.results[0].locations[0].street === '' ){
		throw new Error('Unable to find that address');
	}
	var latitude = response.data.results[0].locations[0].latLng.lat;
	var longitude = response.data.results[0].locations[0].latLng.lng
	var weatherURL = `https://api.darksky.net/forecast/a008c9e0a5ff260ae4ecdd4e282d1f57/${latitude},${longitude}`;
	console.log(response.data.results[0].locations[0].street);
	return axios.get(weatherURL);
}).then((response) => {
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;
	console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
	if(e.code === 'ENOTFOUND'){
		console.log('Unable to connect to API servers.');
	}else{
		console.log(e.message);
	}
});