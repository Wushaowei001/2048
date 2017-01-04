define(['jquery', 'underscore', 'backbone', 'model/symbols'], function($, _, Backbone, Symbols) {
	var SymbolView = Backbone.View.extend({
		className: 'symbols',
		tagName: 'ul',
		collection: Symbols,
		template: _.template("<% _.each(symbols, function(symbol){ %> <li><span class='icon-<%= symbol.name %>' data-value='<%= symbol.value %>'></span></li><% }); %>"),
		initialize: function() {},
		render: function() {
			this.$el.html(this.template({
				symbols: this.collection.toJSON()
			}));
			return this;
		}
	});
	return SymbolView;
});