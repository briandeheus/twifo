var channel = require('components/channel');

exports.views  = {};
var activeView = null;

var switchActiveView = function (name) {

	activeView.elm.style.display = 'none';
	activeView = exports.views[name];
	activeView.elm.style.display = 'inline-block';

}

exports.hideLoader = function () {

	document.getElementById('app').style.display    = 'block';
	document.getElementById('loader').style.display = 'none';

}

exports.show = function (name, data) {
	
	console.debug('Switching to', name);
	
	if (typeof activeView.onexit === 'function') {

		activeView.onexit(function () {

			if (typeof exports.views[name].beforeload === 'function') {

				exports.views[name].beforeload(data, function () {

					switchActiveView(name);

				});

			} else {

				switchActiveView(name);

			}

		});

	} else {

		if (typeof exports.views[name].beforeload === 'function') {

			exports.views[name].beforeload(data, function () {

				switchActiveView(name);

			});

		} else {

			switchActiveView(name);

		}

	}
	

}

exports.init = function () {

	var views = document.querySelectorAll('[data-view]');
	for (var i = 0, l = views.length; i < l; i++) {

		var view   = views[i];
		var name   = view.dataset.view;
		var active = view.dataset.active;

		exports.views[name] = {
			elm: view
		};

		if (active === "true") {

			console.debug('Setting', name, 'as active view');
			activeView = exports.views[name];

		}

	}

	channel.emit('view:setup')

}
