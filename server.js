var express = require('express');
var io = require('socket.io');

var app = express.createServer();
	 app.use(express.static(__dirname));
var io = io.listen(app);

app.listen(3000);

var TestStore = require('./lib/testStore');
var testStore = TestStore();

io.sockets.on('connection', function (socket) {
	socket.on('sync', function(method,model,cb) {
		testStore.syncInterface(method,model,function(resp) {
			cb(resp);
		});
	});
});