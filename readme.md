#backbone-socket
Persist backbone models over socket.io websockets; you provide the datastore

##Usage
Client:

- Establish websocket connection
- Require backbone.socket.js _after_ **socket** global is available
- Create / extend BackboneSocket as you would Backbone.Model

Server:

- 
- Attach handler to websocket

	``` javascript
	io.sockets.on('connection', function (socket) {
		//catch 'sync' requests
		var backSocket = require('./lib/backSocket');
		backSocket(socket);
	});
	```