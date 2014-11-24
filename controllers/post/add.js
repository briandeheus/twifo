var carton = require('carton');
var snor   = carton.snor;
var server = carton.server.methods;
var bbset  = carton.cfg.get('bbsettings');
var async  = require('async');

server.post('/post/add', function (req, res) {

	if (!req.session.uid) {

		carton.error.send(res, 401, 'You are not logged in.');
		return;

	}
	
	function addPost(next) {

		var body   = req.param('body');
		var thread = req.param('thread');

		if (!body || !thread) {
			carton.error.send(res, 400, 'You probably tried to circumvent the JSON api.');
			return;
		}

		carton.logger.info('Adding reply to', thread, body, 'by', req.session.uid);

		carton.post.add(req.session.uid, thread, body, next);

	}

	function bumpCount(next) {

		carton.thread.updateForNewPost(req.param('thread'), req.session.uid, next);

	}

	async.series([

		addPost,
		bumpCount

	], function (error) {

		if (error) {

			carton.error.send(res, 500, 'Something went wrong.');
			return;
			
		}

		res.json(200, 'ok');

	});



});