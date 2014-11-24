var mysql  = require('mysql');
var carton = require('carton');
var logger = carton.logger.create('mysql');
var pool   = mysql.createPool({
	host     : carton.cfg.get('mysql.host'),
	user     : carton.cfg.get('mysql.user'),
	password : carton.cfg.get('mysql.password'),
	database : carton.cfg.get('mysql.database')
});

exports.query = function (query, params, cb) {

	var then = Date.now();

	logger.verbose('Attempting query', query, 'with params', params);

	pool.getConnection(function(err, connection) {

		connection.query(query, params, function(err, rows) {
   			
   			if (err) {
   				logger.error('Could not execute query', err);
   			}

   			logger.info('Query executed in', Date.now() - then, 'ms');
   			cb(err, rows);
   			connection.release();

		});

	});

}

exports.name = 'mysql';
