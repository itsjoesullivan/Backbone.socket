/* Simple object to test datastore
		Yours should have some sort of a syncInterface
*/
var TestStore = function() {
	var store = {}
		
		store.models = {};
	
		store.createID =  function() {
			return Math.floor(100000*Math.random());
		};
	
		store.setModel =  function(model,cb) {
			if(typeof(model.id)!=='undefined') {
				this.models[model.id] = model;
				cb(model);
			} else {
				model.id = this.createID();
				this.models[model.id] = model;
				return cb(model);
			}
		};
	
		store.getModel =  function(model,cb) {
			if(!model.id||!this.models[model.id]) {
				return cb(false);

			} else {
				return cb(this.models[model.id]);
			}
		};
	
		store.deleteModel =  function(model,cb) {
			if(!(model.id&&this.models[model.id])) {
				if(cb) {
					return cb(false);
				}
			} else {
				delete this.models[model.id];
				if(cb) {
					return cb(true);
				}
			}
		};
	
		store.syncInterface =  function(method,model,cb) {
			switch (method) {
				case 'create'	: this.setModel(model,cb); break;
				case 'read' 	: this.getModel(model,cb); break;
				case 'update'	: this.setModel(model,cb); break;
				case 'delete' 	: this.deleteModel(model,cb); break;
			}
		};
	return store;
};

module.exports = TestStore;