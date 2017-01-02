define(['backbone'], function(Backbone) {
	var Symbol = Backbone.Model.extend({
		defaults: {
			'name': '',
			'value': 0
		}
	});

	return Symbol;

});