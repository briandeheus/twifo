var carton = require('carton');
var mysql  = carton.mysql;

exports.name = 'user';

exports.findOne = function (uid, cb) {

	mysql.query('SELECT * FROM `users` WHERE `id` = ?', [uid], function (error, result) {

		if (error) {
			cb(error);
			return;
		}

		cb(null, result[0]);

	});

};

exports.add = function (id, username, screenname, avatar, oauthToken, oauthSecret, cb) {

	mysql.query('INSERT INTO `users` (`id`, `username`, `screenname`, `avatar`, `oauthToken`, `oauthSecret`) VALUES (?, ?, ?, ?, ?, ?)', [id, username, screenname, avatar, oauthToken, oauthSecret], cb);

};