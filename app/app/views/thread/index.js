var views    = require('components/views');
var threads  = require('components/thread');
var posts    = require('components/post');
var async    = require('async');

var view     = views.views.thread.elm;
var postsElm = document.querySelector('#posts');

var vars     = {
	title: view.querySelector('x-var[name="title"]'),
	topic: view.querySelector('x-var[name="topic"]'),
	date : view.querySelector('x-var[name="postdate"]')
}

function addPost(postObject, next) {

	posts.drawPost(postObject, next);

}

views.views.thread.beforeload = function (data, cb) {

	vars.topic.textContent = data.thread.topic;
	vars.title.textContent = data.thread.title;
	vars.date.textContent  = data.thread.creationTime;

	while (postsElm.lastChild) {
		postsElm.removeChild(postsElm.lastChild);
	}

	data.posts.unshift(data.thread);

	async.eachSeries(data.posts, addPost, cb);

}