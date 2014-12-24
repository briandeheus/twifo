var $ = require('jquery');

function request(type, path, data, cb) {

	var requestObj  = {};
	requestObj.type = type;
	requestObj.url  = window.settings.apiurl + path;
	requestObj.data = data || {};

	$.ajax(requestObj).done(function (data, status) {

		cb(null, data, status);

	}).fail(function (xhr, status) {

		cb(status);

	});

}

exports.PUT = function (path, data, cb) {

	request('PUT', path, data, cb);
	
}

exports.GET = function (path, data, cb) {

	request('GET', path, data, cb);
	
}

exports.POST = function (path, data, cb) {

	request('POST', path, data, cb);
	
}