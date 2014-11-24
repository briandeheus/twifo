var carton     = require('carton');
var snor       = carton.snor;
var server     = carton.server.methods;
var bbset      = carton.cfg.get('bbsettings');
var async      = require('async');
var dateformat = require('dateformat');

server.get('/thread/view/:id', function (req, res) {

	if (!req.session.uid) {

		carton.error.send(res, 401, 'You are not logged in.');
		return;

	}

	var thread;
	var posts;

	function getThread(next) {

		carton.thread.getOne(req.param('id'), function (error, data) {

			if (error || data === undefined) {

				carton.error.send(res, 404, 'Thread could not be found');
				return;

			}

			thread              = data;
			thread.lastUpdate   = dateformat(thread.lastUpdate, 'h:MM TT');
			thread.creationTime = dateformat(thread.creationTime, 'h:MM TT');

			next();

		});

	}

	function getPosts(next) {

		carton.post.getForThread(req.param('id'), 0, 100, function (error, postsArray) {

			if (error) {

				carton.error.send(res, 404, 'Something went wrong looking for posts');
				return;

			}

			for (var i = 0, l = postsArray.length; i < l; i++) {
				postsArray[i].creationTime = dateformat(postsArray[i].creationTime, 'h:MM TT');
			}

			posts = snor.partial('thread/partials/post', postsArray);
			next();

		});

	}

	async.series([
		getThread,
		getPosts
	], function (error) {

		if (error) {

			carton.error.send(res, 500, 'Something went wrong.');
			return;
			
		}

		console.log(posts);

		var view = snor.make('thread/thread', ['global/partials/header', 'global/partials/footer'], {
			title:    bbset.title,
			user:     req.session,
			settings: bbset,
			thread:   thread,
			posts:    posts
		});
		
		res.send(view);

	});

});