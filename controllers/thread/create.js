var carton = require('carton');
var snor   = carton.snor;
var server = carton.server.methods;
var bbset  = carton.cfg.get('bbsettings');
var async  = require('async');

server.post('/thread/create', function (req, res) {

	if (!req.session.uid) {

		carton.error.send(res, 401, 'You are not logged in.');
		return;

	}
	
	function savePost(next) {

		var body  = req.param('body');
		var title = req.param('title');
		var topic = req.param('topic');

		console.log(body, title, topic);

		if (!body || !title || !topic) {
			carton.error.send(res, 400, 'You probably tried to circumvent the JSON api.');
			return;
		}

		carton.logger.info('Making new thread', topic, title, body, 'by', req.session.uid);

		carton.thread.add(req.session.uid, topic, title, body, next);

	}

	async.series([
		savePost
	], function (error) {

		if (error) {

			carton.error.send(res, 500, 'Something went wrong.');
			return;
			
		}

		res.json(200, 'ok');

	});



});

server.get('/thread/create', function (req, res) {

	if (!req.session.uid) {

		carton.error.send(res, 401, 'You are not logged in.');
		return;

	}

	var topics;

	function getTopics(next) {

		carton.topic.findAll(function (error, topicsArray) {

			if (error) {
				next(error);
				return;
			}

			topics = snor.partial('thread/partials/topic', topicsArray);
			next();

		});

	}

	async.series([
		getTopics
	], function (error) {

		if (error) {

			carton.error.send(res, 500, 'Something went wrong.');
			return;
			
		}

		var view = snor.make('thread/create', ['global/partials/header', 'global/partials/footer'], {
			title:    bbset.title,
			user:     req.session,
			settings: bbset,

			//Partials
			topics:   topics
		});
		
		res.send(view);

	});

});