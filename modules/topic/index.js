var carton = require('carton');
var mysql  = carton.mysql;

exports.name = 'topic';

exports.findAll = function (cb) {

	mysql.query('SELECT `slug`, `name` FROM `topics`', [], function (error, result) {

		if (error) {
			cb(error);
			return;
		}

		cb(null, result);

	});

};
