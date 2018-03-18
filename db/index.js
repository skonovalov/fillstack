const mongoose = require('mongoose');
const config   = require('../config');

module.exports = {
	connect() {
		mongoose.connect(config.get('mongoose:uri'));
	}
};