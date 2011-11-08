#backbone-socket
Persist backbone models over socket.io websockets; you provide the datastore

##Usage
###Client:

- Establish websocket connection
- Require backbone.socket.js _after_ **socket** global is available
- Create / extend BackboneSocket as you would Backbone.Model

OR

- Just overwrite sync():

	``` javascript
	var BackboneSocket = Backbone.Model.extend({
		...
		sync: socketSync
		...
	});
	```
###Server:

- Attach a sync()-compliant datastore to websockets:

	``` javascript
	socket.on('sync', function(method,model,cb) {
		testStore.syncInterface(method,model,function(resp) {
			cb(resp);
		});
	});
	```