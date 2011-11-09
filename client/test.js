describe('jasmine', function() {
	it('is running', function() {
		expect(0).toEqual(0);
	});
});

describe('socket', function() {
	
	it('exists', function() {
		expect(socket).toBeDefined();
	});
	
	it('is running', function() {
		x = false
		socket.on('connect', function() {
			expect(x).toBeFalsy();
			x = true;
			expect(x).toBeTruthy();
			jasmine.asyncSpecDone();
		});
		jasmine.asyncSpecWait();
	});
});

describe('backbone.socket', function() {

	it('is a valid model', function() {
		var testModel = new BackboneSocket();
		expect(testModel.get('test')).toBeFalsy();
		testModel.set({'test':true});
		expect(testModel.get('test')).toBeTruthy();
	});
	
	it('can create', function() {
		var testModel = new BackboneSocket();
		testModel.set({'test':true});
		testModel.save({}, {success: function(resp) {
			expect(resp.id).toBeDefined();
			jasmine.asyncSpecDone();
		}, error: function() {
		}});
		jasmine.asyncSpecWait();
	});
	
	it('can read', function() {
		var testModel = new BackboneSocket();
		testModel.set({'test':true});
		testModel.save({}, {success: function(model,resp) {
			expect(model.id).toBeDefined();
			expect(model.get('test')).toBeTruthy();
			jasmine.asyncSpecDone();
		}});
		jasmine.asyncSpecWait();
	});
	
	it('can update', function() {
		var testModel = new BackboneSocket();
		testModel.set({'test':true});
		testModel.save({}, {success: function(model,resp) {
			expect(resp.test).toBeTruthy();
			model.save({'test':false},{success:function(model,resp) {
				expect(model.get('test')).toBeFalsy();
				jasmine.asyncSpecDone();
			}});
		}, error: function() {
		}});
		jasmine.asyncSpecWait();
	});
	
	it('can delete', function() {
		var testModel = new BackboneSocket();
		testModel.set({'test':true});
		testModel.save({}, {success: function(model,resp) {
			expect(model.id).toBeDefined();
			expect(model.get('test')).toBeTruthy();
			model.destroy({success:function(model,resp) {
				expect(resp).toBeTruthy();
				testModel.fetch({success:function(model,resp) {
					expect(resp.toBeFalsy());
					jasmine.asyncSpecDone();
				},error: function(model,resp) {
					expect(resp).toBeFalsy();
					jasmine.asyncSpecDone();
				}})
			}});
		}});
		jasmine.asyncSpecWait();
	});
	

	
});