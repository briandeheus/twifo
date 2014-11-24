var carton = require('carton');

exports.name = 'error';

exports.send = function (res, code, message) {

	res.send(code, carton.snor.make('error/error', ['global/partials/header', 'global/partials/footer'], {

		title: 'Error ' + code,
		code: code,
		message: message
		
	}));

}
