var mustache      = require('mustache');
var ajax          = require('components/ajax');
var router        = require('components/router');
var views         = require('components/views');

var TEMPLATE      = false;
var threadWrapper = document.getElementById('threads');


var proto = Object.create(HTMLElement.prototype);

proto.createdCallback = function () {

	var that = this;
	var href = that.getAttribute('href');

	this.addEventListener('click', function(e) {

		router.do(href);

	});

};

document.registerElement('x-thread', {
	prototype: proto
});

exports.drawThread = function (thread, next) {

	if (TEMPLATE) {

		var rendered = mustache.render(TEMPLATE, thread);
		threadWrapper.insertAdjacentHTML('beforeend', rendered);

		next();
	
	} else {

		ajax.GET('/templates/home/partials/thread.mustache', {}, function(error, template) {

			TEMPLATE     = template;
			var rendered = mustache.render(TEMPLATE, thread);
			threadWrapper.insertAdjacentHTML('beforeend', rendered);

			next();

		});
		
	}

}