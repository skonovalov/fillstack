const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let barberSchema = new Schema({
	_id: Number,
	name: {
		type    : String,
		required: true
	},
	lastName: {
		type    : String,
		required: true
	},
	text: String,
	img : String
});

module.exports = mongoose.model('User', barberSchema);