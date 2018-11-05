const request = require('request');

var geocodeAddress = (address, callback) => {
	var encodedAddress = encodeURIComponent(address);

	request({
		url: `http://www.mapquestapi.com/geocoding/v1/address?key=jAr8wJxTbwFSTsm6qVA7HS13Cda8DUTi&location=${encodedAddress}`,
		json: true
	}, (error, response, body) => {
		if(error){
			callback('Unable to connect to servers.');
		}else if( body.results[0].locations[0].street === '' ){
			callback('Address not found');
		}else {
			callback(undefined,{
				address: body.results[0].providedLocation.location,
				Latitude: body.results[0].locations[0].latLng.lat,
				Longitude: body.results[0].locations[0].latLng.lng
			});
		}
	});
};

module.exports = {
	geocodeAddress
}