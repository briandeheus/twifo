var carton = require('carton');
var snor   = carton.snor;
var server = carton.server.methods;
var async  = require('async');

server.get('/login/twitter', function (req, res) {

	if (req.query.oauth_token && req.query.oauth_verifier) {

		var userData;
		var authData;
		var sessionData;

		function getToken(next) {

			carton.twitter.getAuthToken(req.query.oauth_token, req.query.oauth_verifier, function (error, dataObj) {

				if (error) {
					next(error);
					return;
				}

				authData = dataObj;
				next();

			});

		}

		function getData(next) {

			carton.twitter.showUser(authData.user_id, authData, function (error, userObject) {	
				
				if (error) {
					next(error);
					return;
				}

				userData = userObject;
				next();

			});

		}

		function findUser(next) {

			carton.user.findOne(userData.id, function (error, data) {

				if (error) {
					next(error);
					return;
				}

				if (data === undefined) {

					carton.logger.info('User could not be found');
					addUser(next);
					return;

				}

				sessionData = {
					uid:        data.id,
					username:   data.username,
					screenname: data.screenname,
					avatar:     data.avatar
				};

				next();

			});

		}

		function addUser(next) {

			carton.logger.info('Adding new user');
			sessionData = {
				uid:        userData.id,
				username:   userData.screen_name,
				screenname: userData.name,
				avatar:     userData.profile_image_url_https.replace('normal', 'bigger'), 
			};

			carton.user.add(
				userData.id, 
				userData.screen_name, 
				userData.name, 
				userData.profile_image_url_https.replace('normal', 'bigger'), 
				authData.oauth_token, 
				authData.oauth_token_secret,
				next);

		}

		async.series([
			getToken,
			getData,
			findUser
		], function (error) {

			if (error) {
				carton.logger.info('Could not authenticate user:', error);
				res.send(500, carton.error.make(500, 'We were unable to authenticate you.'));
			}

			for (var val in sessionData) {
				req.session[val] = sessionData[val];
			}

			res.redirect('/');

		});
		

	} else {

		carton.twitter.getAuthUrl(function (error, data) {

			if (error) {
				res.send(500, carton.error.make(500, 'We were unable to authenticate you.'));
			}

			console.log('DATA:', data);
			res.redirect(data);

		});

	}

});