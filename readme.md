#backbone-socket
Persist backbone models over socket.io websockets; you provide the datastore

##Usage
Client:

- Establish websocket connection
- Require backbone.socket.js _after_ **socket** global is available
- Create / extend BackboneSocket as you would Backbone.Model

Server:

- Attach a  to backSocket:

	``` javascript
	// Example testStore exposes syncInterface(method,model,cb())
	var backSocket = function(socket) {
		socket.on('sync', function(method,model,cb) {
			testStore.syncInterface(method,model,function(resp) {
				cb(resp);
			});
		});
	}
	```
	
- Attach a sync()-compliant datastore to websockets:

	``` javascript
	socket.on('sync', function(method,model,cb) {
		testStore.syncInterface(method,model,function(resp) {
			cb(resp);
		});
	});
	```