var views = require('components/views');

var Router = function () {

	this._routes = [];

}

Router.prototype.addRoute = function (route, func) {

	var ident = route.split('/:')[0] || route;
	this._routes.push({
		ident:     ident,
		func:      func,
		parts:     route.split('/').length,
		parmsFrom: ident.split('/').length
	});

}

Router.prototype.find = function (path) {

	var ident  = path.split('/:')[0] || path;
	var parts  = path.split('/');
	var partsl = parts.length;

	for (var i = 0, l = this._routes.length; i < l; i++) {

		var route = this._routes[i]

		if (ident.indexOf(route.ident) === 0 && partsl === route.parts) {
			route.func.apply(this, parts.splice(route.parmsFrom));
			return;
		}

	}

}

var r = new Router();

exports.do = function (path) {

	history.pushState({path: path}, "New Thread", path);
	r.find(path);

};

exports.addRoute = function (route, cb) {

	r.addRoute(route, cb);

};

window.onpopstate = function (event) {

	if (!event.state) {
		views.show('overview');
	} else {
		r.find(event.state.path);
	}

}