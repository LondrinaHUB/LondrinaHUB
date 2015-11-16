var mongoose     = require('mongoose');
var Schema       = mongoose.Schema,
	ObjectId 	 = Schema.ObjectId;

var busStopSchema   = new Schema({
	name: String,
	code: String,
	latitude: Number,
	latitude: Number,
	buslines:[{busline_id: ObjectId}]
});

module.exports = mongoose.model('busstop', busStopSchema);
