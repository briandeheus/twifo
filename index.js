var carton = require('carton');
var appDir = require('path').dirname(require.main.filename);
var then   = Date.now();

//Load configuration file
carton.cfg.load('./cfg/' + process.env.NODE_ENV + '.json');
carton.setAppDir(appDir);

//Load modules
carton.add(require('./modules/logger'));
carton.add(require('./modules/server'));
carton.add(require('carton-snor'));

carton.setup(function (error) {

	carton.logger.info('Setting up controllers');
	require('./controllers/home');
	carton.logger.info('Carton started up in', Date.now() - then, 'ms');

});