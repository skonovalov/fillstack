const express = require('express');
const router  = express.Router();

const indexRouter  = require('./main');
const barberRouter = require('./barber');

indexRouter(router);
barberRouter(router);

module.exports = router;