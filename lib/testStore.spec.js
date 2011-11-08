var TestStore = require('./testStore');

describe('TestStore', function() {
	
	it('exists', function() {
		var testStore = TestStore();
		//expect(typeof(testStore)).toEqual('object');
	})
	
});

describe('TestStore::models', function() {

	it('exists', function() {
		var testStore = TestStore();
		expect(testStore.models).toBeDefined();
	});
	
});

describe('TestStore::setModel', function() {

	it('inserts a model and calls cb(model)', function() {
		
		var testStore = TestStore();
		testStore.setModel({'test':true}, function(model) {
			expect(model.test).toBeTruthy();
		});
	});
	
	it('inserts creates an id', function() {
		
		var testStore = TestStore();
		testStore.setModel({'test':true}, function(model) {
			expect(model.id).toBeGreaterThan(1000);
		});
	});
	
});

describe('TestStore::getModel', function() {

	it('retrieves a model', function() {
		
		var testStore = TestStore();
		testStore.setModel({'test':true}, function(model) {
			var oldModel = model
			testStore.getModel(oldModel, function(model) {
				expect(model.id).toEqual(oldModel.id);
			})
		});
	});
});

describe('TestStore::deleteModel', function() {

	it('retrieves a model', function() {
		
		var testStore = TestStore();
		testStore.setModel({'test':true}, function(model) {
			testStore.deleteModel(model, function(status) {
				expect(status).toBeTruthy();
			});
			testStore.deleteModel(model, function(status) {
				expect(status).toBeFalsy();
			});
		});
	});
});