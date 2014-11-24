var carton = require('carton');
var mysql  = carton.mysql;

exports.name = 'post';

exports.add = function (owner, thread, body, cb) {

	var now    = Date.now();
	var values = [owner, thread, body, now];

	var query  = 'INSERT INTO `posts` (`thread`, `owner`, `creationTime`, `body`) VALUES (?, ?, ?, ?)';
	mysql.query(query, [thread, owner, now, body], cb);

};

exports.getForThread = function (id, from, to, cb) {

	var query = 'SELECT * FROM `posts` LEFT JOIN `users` ON `users`.`id` = `posts`.`owner` WHERE `thread` = ? LIMIT ?, ?'
	mysql.query(query, [id, from, to], cb);

}
