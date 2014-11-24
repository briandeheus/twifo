var carton     = require('carton');
var app        = require('express')();
var port       = carton.cfg.get('server.port');
var secret     = carton.cfg.get('server.secret');
var session    = require('express-session');
var RedisStore = require('connect-redis')(session);

var server;

//Allow for nginx proxying.
app.enable('trust proxy');

//Adding middleware.
app.use(require('body-parser')());
app.use(require('cookie-parser')());

app.use(session({
    store: new RedisStore({host: carton.cfg.get('redis.host')}),
    secret: secret
}));

var session = 

exports.methods = app;
exports.name    = 'server';

exports.setup   = function (cb) {

	server = app.listen(port, cb);

	app.use(function(req, res, next){

		carton.logger.verbose('Incoming', req.method, 'request:', req.url);
		next();

	});

};


