var carton = require('carton');
var server = carton.server.methods;

server.get('/api/topics/all', function (req, res) {

	carton.topic.findAll(function (error, topicsArray) {

		if (error) {
			
			carton.logger.error('Error when fetching topics;', error);
			res.json(500, { error: 'Something went wrong!'});
			return;

		}

		res.json(200, topicsArray);

	});

});

