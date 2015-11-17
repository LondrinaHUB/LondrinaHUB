var mongoose     = require('mongoose');
var Schema       = mongoose.Schema,
	ObjectId 	 = Schema.ObjectId;

var BusLineSchema   = new Schema({
	name: String,
	code: String,
	cities: [ { name: String, state: String}],
	routes: {
		route:[ {latitude: String, longitude:Number}],
		backroute:[ {latitude: String, longitude:Number}]
	}
});

var BusStopSchema   = new Schema({
	name: String,
	code: String,
	latitude: Number,
	latitude: Number,
	buslines:[{busline_id: ObjectId}]
});


var BusLine = mongoose.model('BusLine', BusLineSchema);
var BusStop = mongoose.model('BusStop', BusStopSchema);

module.exports = {
	BusLine : BusLine,
	BusStop : BusStop
}

