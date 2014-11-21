var winston = require('winston');
var carton  = require('carton');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
	'colorize':true, 
	'timestamp': true,
	'level': carton.cfg.get('logger.level')
});

module.exports = winston;
module.exports.name = 'logger';
module.exports.create = function (type) {

	winston.loggers.add(type, { console: {

		'colorize':true, 
		'timestamp': true,
		'level': carton.cfg.get('logger.level'),
		'label': type

	}});

	return winston.loggers.get(type);
	
}