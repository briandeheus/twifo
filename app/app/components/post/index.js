var mustache = require('mustache');
var ajax     = require('components/ajax');
var router   = require('components/router');
var views    = require('components/views');
var postsElm = document.querySelector('#posts');
var TEMPLATE = false;

var proto = Object.create(HTMLElement.prototype);
proto.createdCallback = function () {

	console.trace();
	console.log('Blah');

	var img       = document.createElement('img');
	img.src       = this.getAttribute('src');
	img.className = "img-rounded";

	if (this.getAttribute('type') === 'header') {
		img.className += ' img-avatar';
	}
	
	img.onerror   = function () {
		img.src = '/static/img/no_avatar.png'
	}

	this.appendChild(img);

};

document.registerElement('x-avatar', {

	prototype: proto

});


exports.drawPost = function (post, next) {

	console.log('post:', post);

	if (TEMPLATE) {

		postsElm.insertAdjacentHTML('beforeend', mustache.render(TEMPLATE, post));
		next();
	
	} else {

		ajax.GET('/templates/thread/partials/post.mustache', {}, function(error, template) {

			TEMPLATE = template;
			postsElm.insertAdjacentHTML('beforeend', mustache.render(TEMPLATE, post));

			next();

		});
		
	}

}