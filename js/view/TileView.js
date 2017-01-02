define(
	['jquery', 'underscore', 'backbone', 'model/tile', 'view/SymbolView'
		// ,		'text!templates/tile.html'
	],
	function($, _, Backbone, Tile, SymbolView) {
		var TileView = Backbone.View.extend({
			model: Tile,
			className: 'tile',
			initialize: function() {
				this.listenTo(this.model, 'change', this.render);
				this.listenTo(this.model, 'appear', this.appear);
			},
			render: function() {
				this.renderEdges();
				return this;
			},
			renderEdges: function() {
				var edges = this.model.get('edges');

				this.$el.attr({
					'data-xy': this.model.get('x') + '-' + this.model.get('y')
				});
				if (this.model.get('value') != 0) {
					this.$el.attr({
						'data-edge-t': _.contains(edges, 'top') ? '1' : '0',
						'data-edge-b': _.contains(edges, 'bottom') ? '1' : '0',
						'data-edge-l': _.contains(edges, 'left') ? '1' : '0',
						'data-edge-r': _.contains(edges, 'right') ? '1' : '0'
					});
				}
			},
			appear: function() {
				this.render();
			}
		});
		return TileView;
	});