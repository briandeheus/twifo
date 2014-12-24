var carton     = require('carton');
var server     = carton.server.methods;
var dateformat = require('dateformat');

server.get('/api/threads/all', function (req, res) {

	carton.thread.getLatest(0, 10, null, function (error, threadsArray) {

		if (error) {
			
			carton.logger.error('Error when fetching threads;', error);
			res.json(500, { error: 'Something went wrong!'});
			return;

		}

		for (var i = 0, l = threadsArray.length; i < l; i++) {

			threadsArray[i].lastUpdate = dateformat(threadsArray[i].lastUpdate, 'h:MM TT');

		}

		res.json(200, threadsArray)

	});

});

