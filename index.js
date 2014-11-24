var carton = require('carton');
var appDir = require('path').dirname(require.main.filename);
var then   = Date.now();

//Load configuration file
carton.cfg.load('./cfg/' + process.env.NODE_ENV + '.json');
carton.setAppDir(appDir);
carton.add(require('carton-snor'));
carton.add(require('./modules/error'));

//Load modules
carton.add(require('./modules/logger'));
carton.add(require('./modules/server'));
carton.add(require('./modules/mysql'));
carton.add(require('./modules/twitter'));
carton.add(require('./modules/user'));
carton.add(require('./modules/topic'));
carton.add(require('./modules/thread'));
carton.add(require('./modules/post'));


carton.setup(function (error) {

	carton.logger.info('Setting up controllers');

	carton.server.methods.use(function(req, res, next) {
		
		var then = Date.now();
		res.on('finish', function () {

			carton.logger.verbose('Response finished in', Date.now() - then, 'ms');

		});

		next();

	});	

	require('./controllers/home');
	require('./controllers/login/twitter');
	
	require('./controllers/thread/create');
	require('./controllers/thread/view');

	require('./controllers/post/add');

	carton.logger.info('Carton started up in', Date.now() - then, 'ms');


});