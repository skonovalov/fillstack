const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const config     = require('./config');
const routes     = require('./routes');

const app = express();

app.disable('x-powered-by');

app.set('home', path.join(__dirname, 'public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./public'));

app.use('/', routes);

app.listen(config.get('port'), () => {
	console.log('server running on : ', config.get('port'));
	console.log(app.get('env'));
});