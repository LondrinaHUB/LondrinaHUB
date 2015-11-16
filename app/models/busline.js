var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var busLineSchema   = new Schema({
	name: String,
	code: String,
	cities: [ { name: String, state: String}],
	routes: {
		route:[ {latitude: String, longitude:Number}],
		backroute:[ {latitude: String, longitude:Number}]
	}
});

module.exports = mongoose.model('busline', busLineSchema);

