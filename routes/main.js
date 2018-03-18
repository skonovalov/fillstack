const indexController = require('../controllers/indexController');
const path            = require('path');

function getData(barbers, res) {
	barbers.forEach((item) => {
		item.href = path.join('/barber/', String(item.id));
	});

	res.render('main', {
		barbers
	});

	next();
}

module.exports = (router) => {
	router.get('/', (req, res, next) => {
		indexController(req, res, getData);
	});
};