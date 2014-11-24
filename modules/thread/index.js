var carton = require('carton');
var mysql  = carton.mysql;

exports.name = 'thread';

exports.add = function (owner, topic, title, body, cb) {

	var now    = Date.now();
	var values = [topic, owner, title, body, 0, owner, now, now];

	mysql.query('INSERT INTO `threads` (`topic`, `owner`, `title`, `body`, `posts`, `lastPoster`, `lastUpdate`, `creationTime`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', values, cb);

};

exports.getLatest = function (from, to, topic, cb) {

	var sql = 'SELECT *, `threads`.`id` AS `tid`, `topics`.`name` AS `topic` FROM `threads` LEFT JOIN `topics` ON `topics`.`slug` = `threads`.`topic` LEFT JOIN `users` ON `users`.`id` = `threads`.`lastPoster` ORDER BY `lastUpdate` DESC';
	mysql.query(sql, [], cb);

}

exports.getOne = function (id, cb) {

	var sql = 'SELECT *, `threads`.`id` AS `tid`, `topics`.`name` AS `topic` FROM `threads` LEFT JOIN `topics` ON `topics`.`slug` = `threads`.`topic` LEFT JOIN `users` ON `users`.`id` = `threads`.`owner` WHERE `threads`.`id` = ?';
	mysql.query(sql, [id], function (error, data) {

		if (error) {
			cb(error);
			return;
		}

		cb(null, data[0]);

	});

}

exports.updateForNewPost = function (id, uid, cb) {

	mysql.query('UPDATE `threads` SET `posts` = `posts` + 1, lastUpdate = ?, lastPoster = ? WHERE `id` = ?', [Date.now(), uid, id], cb);

}