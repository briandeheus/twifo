var ajax     = require('components/ajax');
var views    = require('components/views');
var channel  = require('components/channel');
var router   = require('components/router');

var overview = require('views/overview');

var async    = require('async');
var mustache = require('mustache');

function init() {

	function checkLogin(next) {

		ajax.GET('/api/amiloggedin', {}, function (error, result) {

			if (error) {
				next(error);
				return;
			}

			if (result === 'no') {

				window.location = '/login/twitter'
				return;

			}

			next();

		});

	}


	function getThreads(next) {

		ajax.GET('/api/threads/all', {}, function (error, result) {

			if (error) {
				next(error);
				return;
			}

			overview.updateThreads(result, next);

		});

	}

	function registerRoutes(next) {

		router.addRoute('/thread/view/:id', function (id) {

			ajax.GET('/api/threads/one/' + id, {}, function (error, data) {

				views.show('thread', data);
				
			});

		});

		next();

	}

	async.series([

		checkLogin,
		getThreads,
		registerRoutes

	], function (error) {

		if (error) {
			console.error('Could not complete init:', error);
			return;
		}

		views.hideLoader();
		views.show('overview');

	});

}

channel.on('view:setup', function () {

	init();

});

views.init();
