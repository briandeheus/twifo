var carton    = require('carton');
var request   = require('request');
var qs        = require('querystring');
var logger    = carton.logger.create('twitter');

var APIKEY    = carton.cfg.get('twitter.key');
var APISECRET = carton.cfg.get('twitter.secret');
var URL       = carton.cfg.get('server.protocol') + '://' + carton.cfg.get('server.url');

function getOauthObject(authObject) {

	var obj = {
		callback:        URL + '/login/twitter',
		consumer_key:    APIKEY,
		consumer_secret: APISECRET
	};

	if (authObject) {
		obj.oauth_token = authObject.oauth_token;
	}

	return obj;

}

function getRequestToken(cb) {

	var url = 'https://api.twitter.com/oauth/request_token';
	request.post( { url:url, oauth:getOauthObject() }, function (e, r, body) {

		cb(null, qs.parse(body));

	});

};

exports.getAuthUrl = function (cb) {

	getRequestToken(function (error, data) {

		if (error) {
			cb(error);
			return;
		}

		cb(null, 'https://api.twitter.com/oauth/authorize?oauth_token=' + data.oauth_token);

	});

}

exports.getAuthToken = function (token, verifier, cb) {

	var url   = 'https://api.twitter.com/oauth/access_token';
	var oauth = getOauthObject();

	oauth.token    = token;
	oauth.verifier = verifier;

	request.post( { url: url, oauth: oauth }, function (e, r, body) {

		cb(null, qs.parse(body));

	});

}

exports.showUser = function (uid, authObject, cb) {

	logger.info('Looking up Twitter data for', uid);
	var url   = 'https://api.twitter.com/1.1/users/show.json?user_id=' + uid;
	var oauth = getOauthObject(authObject);

	request.get( { url: url, oauth: oauth }, function (e, r, body) {

		try {
			cb(null, JSON.parse(body));
		} catch (e) {
			cb(e);
		}

	});

}

exports.name = 'twitter';