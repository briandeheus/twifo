(function (window) {

	var post = $('#post');
	var btn  = $('#submit');
	var newPostWrapper = $('#newPostWrapper');

	var makeNode = function (tag, className, content) {
		var e         = document.createElement(tag);
		e.className   = className
		e.textContent = content || '';

		return e;
	}

	var Post = function (post) {
		var wrapper = makeNode('div', 'row postWrapper');
		var aviW    = makeNode('div', 'col-xs-2 text-right');
		var avi     = makeNode('img', 'img-rounded');

		aviW.appendChild(avi);
		avi.src = window.useravi;

		wrapper.appendChild(aviW);

		var postW = makeNode('div', 'col-xs-10 post');
		var thread = makeNode('b', null, 'Created by you just now');
		var body   = makeNode('p', null, post);

		postW.appendChild(thread);
		postW.appendChild(body);

		wrapper.appendChild(postW);

		return wrapper;
	}

	btn.on('click', function (e) {

		if (!post.val()) {
			alert('Post should not be empty.');
			return;
		}

		$.post('/post/add', {thread: window.threadid, body: post.val()}, function (response, data) {

			newPostWrapper.append(new Post(post.val()));
			post.val('');

		}).fail(function () {

			alert('Something went wrong trying to post a reply');

		});

	});

}(window));