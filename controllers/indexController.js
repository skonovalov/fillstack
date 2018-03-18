const barberModel = require('../models/barberModel');
const mongoose    = require('mongoose');
const config      = require('../config');

module.exports = (req, res, cb) => {
	mongoose
		.connect(config.get('mongoose:uri'))
		.then(() => {
			barberModel.find({}, (err, barbers) => {
				if (err) console.log(err);

				if (typeof cb === 'function') {
					cb(barbers, res);
				}
			})
		})
		.catch(err => { console.log(err);});
};
