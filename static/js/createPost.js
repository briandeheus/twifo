(function (window) {

	var form = $('#createPost');
	var topic = form.find('[name="topic"]');
	var title = form.find('[name="title"]');
	var body  = form.find('[name="post"]');

	form.on('submit', function (e) {

		e.preventDefault();

		if (!topic.val()) {
			alert('Topic should not be empty.');
			return;
		}

		if (!title.val()) {
			alert('Title should not be empty.');
			return;
		}

		if (!body.val()) {
			alert('Body should not be empty.');
			return;
		}

		$.post('/thread/create', {topic: topic.val(), title: title.val(), body: body.val()}, function (response, data) {

			window.location = '/';

		}).fail(function () {



		});

	});

}(window));