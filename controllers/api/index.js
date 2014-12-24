var carton     = require('carton');
var snor       = carton.snor;
var server     = carton.server.methods;
var bbset      = carton.cfg.get('bbsettings');
var async      = require('async');
var dateformat = require('dateformat');
var glob       = require('glob');
var fs         = require('fs');

server.get('/api/amiloggedin', function (req, res) {

	if (!req.session.uid) {

		res.json(200, 'no');
		return;

	}

	res.json(200, 'yes');

});