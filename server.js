var express = require('express');
var io = require('socket.io');

var app = express.createServer();
	 app.use(express.static(__dirname));
var io = io.listen(app);

app.listen(3000);

var TestStore = require('./lib/testStore');
var testStore = TestStore();

var mongoStore = require('./lib/mongoStore');

io.sockets.on('connection', function (socket) {
	
	socket.on('sync', function(method,model,cb) {
		testStore.syncInterface(method,model,function(resp) {
			cb(resp);
		});
	});
	
	
	/* or use mongoStore
		N.B. uncomment idAttribute in ./backbone.socket.js
	*/
	
	/*socket.on('sync', function(method,model,cb) {
		mongoStore(method,model,function(resp) {
			cb(resp);
		});
	});*/
	
});