socketSync = function(method,model,options) {
	socket.emit('sync', method, model, function(resp) {
		if(resp) {
			options.success(resp);
		} else {
			options.error(resp);
		}
	});
};

var BackboneSocket = Backbone.Model.extend({
	
	//idAttribute: "_id", //for MongoDB or CouchDB
	
	sync: socketSync
});