var mongoose     = require('mongoose');
var Schema       = mongoose.Schema,
ObjectId 	 = Schema.ObjectId;

var BusLineSchema   = new Schema({
	name: String,
	code: String,
	cities: [ { name: String, state: String}],
	route:[{loc: [Number]}],
	backroute:[{loc: [Number]}]
});


var BusStopSchema   = new Schema({
	name: String,
	code: String,
	loc: {
		type: [Number],
		index: '2d'
	},
	buslines_id:[{ type: Schema.ObjectId, ref: 'BusLine'}]
});


var BusLine = mongoose.model('BusLine', BusLineSchema);
var BusStop = mongoose.model('BusStop', BusStopSchema);

module.exports = {
	BusLine : BusLine,
	BusStop : BusStop
}                          


