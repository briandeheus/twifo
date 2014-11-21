var carton = require('carton');
var appDir = path.dirname(require.main.filename);

//Load configuration file
carton.cfg.load('./cfg/' + process.env.NODE_ENV + '.json');
carton.setAppDir(carton.cfg.get('appdir'));

//Load modules
carton.add(require('./modules/logger'));
carton.add(require('./modules/server'));
carton.add(require('carton-snor'));

carton.setup(function (error) {

	carton.logger.info('Setting up controllers');
	require('./controllers/home');

});