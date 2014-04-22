define(
		[ 'jquery', 'underscore', 'backbone', 'model/tile', 'view/SymbolView',
				'text!templates/tile.html' ],
		function($, _, Backbone, Tile, SymbolView, TileTemplate) {

			var TileView = Backbone.View
					.extend({

						model : Tile,
						template : _.template(TileTemplate),
						className : 'tile',

						initialize : function() {
							this.listenTo(this.model, 'change', this.render);
							this.listenTo(this.model, 'appear', this.appear);
							this.listenTo(this.model, 'merge', this.merge);
							this.listenTo(this.model, 'translate',
									this.translate);
						},

						render : function() {
							if(this.model.get('value') == 0){
								this.$el.empty().addClass('empty');
								return this;
							}
							this.$el.html(this.template(this.model.toJSON()));
							if (this.model.get('value') != 0) {
								this.$el.find('.wrap').append(new SymbolView({
									collection : this.model.get('symbols')
								}).render().$el);
							}

							if (this.model.get('value') == 0) {
								this.$el.addClass('empty').removeClass('non-empty');
							} else {
								this.$el.removeClass('empty').addClass('non-empty');
							}
							var edges = this.model.get('edges');
							this.$el.attr({
								'data-xy' : this.model.get('x') + '-' + this.model.get('y')
							});
							if (this.model.get('value') != 0) {
								this.$el
										.attr({
											'data-edge-t' : _.contains(edges,
													'top') ? '1' : '0',
											'data-edge-b' : _.contains(edges,
													'bottom') ? '1' : '0',
											'data-edge-l' : _.contains(edges,
													'left') ? '1' : '0',
											'data-edge-r' : _.contains(edges,
													'right') ? '1' : '0'
										});
							} else {
								this.$el
										.removeAttr('data-edge-t data-edge-b data-edge-l data-edge-r');
							}
							if(edges.length > 0){
								this.$el.addClass('can-merge');
							}else{
								this.$el.removeClass('can-merge');
							}
							this.$el
									.attr('data-value', this.model.get('value'));
							this.$el.removeClass('animated grow pulse');

							return this;
						},

						appear : function() {
							this.$el.find('.wrap').addClass('animated grow');
						},

						merge : function() {
							console.log('merged');
							this.$el.find('.wrap').addClass('animated pulse');
						},

						translate : function(to) {
							this.$el.attr({
								'data-xy' : this.model.get('x') + '-' + this.model.get('y')
							});
						}
					});

			return TileView;
		});