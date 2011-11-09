var mongoStore = require('./mongoStore');

describe('mongoStore', function() {

	describe('create', function() {
		
		it('returns a model w an ID', function() {
			mongoStore('create',{'test':true}, function(resp) {
				expect(resp.test).toBeTruthy();
				expect(resp._id).toBeDefined();
				asyncSpecDone();
			});
			asyncSpecWait();
		});
	});
	
	describe('read', function() {
		
		it('retrieves a model', function() {
			mongoStore('create',{'test':true}, function(resp) {
				mongoStore('read',resp, function(resp) {
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
			mongoStore('create',{'test':true}, function(model) {
				var originalID = model._id;
				model.test = false;
				mongoStore('update',model, function(resp) {
					mongoStore('read',{ '_id' : originalID}, function(model) {
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
			mongoStore('create',{'test':true}, function(model) {
				var originalID = model._id;
				mongoStore('delete',model, function(resp) {
					mongoStore('read',{ '_id' : originalID}, function(model) {
						expect(model).toBeFalsy();
						asyncSpecDone();
					});
				});
			});
			asyncSpecWait();
		});
	});
});