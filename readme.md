#backbone-socket
Persist backbone models over socket.io websockets. You provide the datastore.

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
	
##Test
Run server.js then visit 'localhost:3000/client/test.html' for jasmine test

##To-dos:
- General server-side spec for sync()-compliance
- MongoDB syncInterface()