var TestStore = require('./testStore');
var testStore = TestStore();

//Connect the websocket connection to the datastore via a sync interface
var backsocket = function(socket) {
	socket.on('sync', function(method,model,cb) {
		testStore.syncInterface(method,model,function(resp) {
			cb(resp);
		});
	});
}

module.exports = backsocket;