#Backbone.socket
Persist backbone models over websockets. You provide the datastore.

###Dependencies
Assumes you're running socket.io on a node.js server.

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
	
##MongoDB

- To use MongoDB/Mongoose:

 	``` javascript
		var mongoStore = require('./lib/mongoStore');
		socket.on('sync', function(method,model,cb) {
			mongoStore(method,model,function(resp) {
				cb(resp);
			});
		});
	```
	
	- This is a pretty simple implementation. Edit ./lib/mongoStore.js to your database/model name
	
##Test
Run server.js then visit 'localhost:3000/client/test.html' for jasmine test. You may need to 'npm install server.io'.

##Roll your own
To test your own datastore just make sure you're passing tests in './lib/general.spec.js' and './client/test.js'

##To-dos:
- More configurable MongoDB interface