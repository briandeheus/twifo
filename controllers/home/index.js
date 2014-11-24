var carton     = require('carton');
var snor       = carton.snor;
var server     = carton.server.methods;
var bbset      = carton.cfg.get('bbsettings');
var async      = require('async');
var dateformat = require('dateformat');

server.get('/', function (req, res) {

	if (!req.session.uid) {

		var view = snor.make('home/login', ['global/partials/header', 'global/partials/footer'], {
			title:    bbset.title,
			settings: bbset,
		});
		
		res.send(view);
		return;

	}

	var topics;
	var threads;

	function getTopics(next) {

		carton.topic.findAll(function (error, topicsArray) {

			if (error) {
				next(error);
				return;
			}

			topics = snor.partial('home/partials/topic', topicsArray);
			next();

		});

	}

	function getThreads(next) {

		carton.thread.getLatest(0, 10, null, function (error, threadsArray) {

			if (error) {
				next(error);
				return;
			}

			for (var i = 0, l = threadsArray.length; i < l; i++) {

				threadsArray[i].lastUpdate = dateformat(threadsArray[i].lastUpdate, 'h:MM TT');

			}

			threads	= snor.partial('home/partials/thread', threadsArray);
			next();

		});

	}

	async.series([
		getTopics,
		getThreads
	], function (error) {

		if (error) {

			carton.error.send(res, 500, 'Something went wrong.');
			return;
			
		}

		var view = snor.make('home/home', ['global/partials/header', 'global/partials/footer'], {
			title:    bbset.title,
			user:     req.session,
			settings: bbset,

			//Partials
			topics:   topics,
			threads:  threads
		});
		
		res.send(view);

	});

});