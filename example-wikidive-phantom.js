#!/usr/bin/env node
var Tarantula = require('./lib/tarantula.js');

var site = 'http://en.wikipedia.org/';
var tarantula = new Tarantula({
	leg: 'PhantomJS',
	legs: 2,
	stayInRange: true,
});
tarantula.on('request', function (task) {
	console.log('GET', task.uri);
});
// tarantula.on('data', function (task) {
// 	console.info('200', task.uri);
// });
tarantula.on('uris', function (task, newCount) {
	console.log(
		'V:' + tarantula.visited,
		'T:' + tarantula.uris.length,
		'Q:' +  (tarantula.uris.length - tarantula.visited),
		'+' + newCount
	);
});
tarantula.on('error', function (task, errorCode, error) {
	var message = errorCode == 'ERR' ? error : 'ERROR ' + errorCode;
	if (task.parent) {
		console.error(message, task.uri, 'from', task.parent);
	}
	else {
		console.error(message, task.uri);
	}
});
tarantula.on('done', function () {
	console.info('done');
});

console.log('Crawling… ', site);
tarantula.start([site]);
