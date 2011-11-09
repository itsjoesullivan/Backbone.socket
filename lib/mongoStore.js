var mongoStore = function() {
	
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/backbone-socket');
	var Schema = mongoose.Schema
	var ObjectId = Schema.ObjectId;
	var ModelSchema = new Schema({
	    id    : ObjectId
	});
	var Model = mongoose.model('Model', ModelSchema);
	
	var create = function(model,cb) {
		var model = new Model(model);
		model.save(function(err, model) {
			cb(model.toJSON());
		});
	}
	
	var read = function(model,cb) {
		Model.findById(model._id, function(err, result) {
			console.log(result);
			if(err||result===null) {
				return cb(false);
			} else {
				return cb(result.toJSON());
			}
		});
	}
	
	var update = function(model,cb) {
		var id = model._id;
		delete model._id;
		Model.update({'_id':id},model,null,function(err, result) {
			if(err) {
				console.log(err);
			}
			cb(result);
		});
	}
	
	var remove = function(model,cb) {
		Model.remove({'_id':model._id},function(err, result) {
			if(err) {
				console.log(err);
			} else {
				return cb(result);
			}
		});
	}
	
	var syncInterface =  function(method,model,cb) {
		switch (method) {
			case 'create'	: create(model,cb); break;
			case 'read' 	: read(model,cb); break;
			case 'update'	: update(model,cb); break;
			case 'delete' 	: remove(model,cb); break;
		}
	};
	
	return syncInterface;
	
}

module.exports = mongoStore();