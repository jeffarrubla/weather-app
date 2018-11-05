const request = require('request');


var getWeather = (latitude,longitude, callback) => {
	request({
		url: `https://api.darksky.net/forecast/a008c9e0a5ff260ae4ecdd4e282d1f57/${latitude},${longitude}`,
		json: true
	}, (error, response, body) => {
		if (!error && response.statusCode === 200){
			callback(undefined, {
				temperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature
			} );
		} else if(error){
			callback('Unable to connecto to forecast.org');
		}
	});
};

module.exports = {
	getWeather
}