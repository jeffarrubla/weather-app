var getUser = (id, callback) => {
	var user = {
		id: id,
		name: 'Vikram'
	};

	setTimeout(() => {
		callback(user);
	}, 3000);
};

getUser(31, (user) => {
	console.log(user);
});

/*
http://www.mapquestapi.com/geocoding/v1/address?key=jAr8wJxTbwFSTsm6qVA7HS13Cda8DUTi&location=1301%20lombard%20street%20philadelphia

The latitude is stored on the response body here: body.results[0].locations[0].latLng.lat

The longitude is stored on the response body here: body.results[0].locations[0].latLng.lng
*/