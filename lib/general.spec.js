var mongoStore = require('./mongoStore');

var sync = mongoStore;

describe('sync', function() {

	describe('create', function() {
		
		it('returns a model w an ID', function() {
			sync('create',{'test':true}, function(resp) {
				expect(resp.test).toBeTruthy();
				expect(resp._id).toBeDefined();
				asyncSpecDone();
			});
			asyncSpecWait();
		});
	});
	
	describe('read', function() {
		
		it('retrieves a model', function() {
			sync('create',{'test':true}, function(resp) {
				sync('read',resp, function(resp) {
					expect(resp.test).toBeTruthy();
					expect(resp._id).toBeDefined();
				})
				asyncSpecDone();
			});
			asyncSpecWait();
		});
	});
	
	describe('update', function() {
		
		it('updates an existing model', function() {
			sync('create',{'test':true}, function(model) {
				var originalID = model._id;
				model.test = false;
				sync('update',model, function(resp) {
					sync('read',{ '_id' : originalID}, function(model) {
						expect(model.test).toBeFalsy();
						asyncSpecDone();
					});
				});
			});
			asyncSpecWait();
		});
	});
	
	describe('delete', function() {
		
		it('deletes an existing model', function() {
			sync('create',{'test':true}, function(model) {
				var originalID = model._id;
				sync('delete',model, function(resp) {
					sync('read',{ '_id' : originalID}, function(model) {
						expect(model).toBeFalsy();
						asyncSpecDone();
					});
				});
			});
			asyncSpecWait();
		});
	});
});