var views    = require('components/views');
var threads  = require('components/thread');
var async    = require('async');

exports.updateThreads = function (threadsArray, cb) {

	async.eachSeries(threadsArray, threads.drawThread, cb);

}