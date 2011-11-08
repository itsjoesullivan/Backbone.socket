var express = require('express');
var io = require('socket.io');

var app = express.createServer();
	 app.use(express.static(__dirname));
var io = io.listen(app);

app.listen(3000);

io.sockets.on('connection', function (socket) {
	//catch 'sync' requests
	var backSocket = require('./lib/backSocket');
	backSocket(socket);
});