define(
	['jquery', 'underscore', 'backbone', 'model/tiles', 'model/tile', 'model/symbols', 'model/symbol', 'view/TileView', 'model/game'],
	function($, _, Backbone, Tiles, Tile, Symbols, Symbol, TileView, Game) {
		var GameView = Backbone.View.extend({
			className: 'game',
			collection: Tiles,
			seedSymbols: [
				[{
					name: 'star',
					value: 2
				}],
				[{
					name: 'heart',
					value: 2
				}],
				[{
					name: 'star',
					value: 2
				}, {
					name: 'heart',
					value: 2
				}]
			],
			initialize: function() {},
			render: function() {
				// clear game view
				this.$el.empty();
				var i, j, tile;
				for (i = 0; i < 4; i++) {
					for (j = 0; j < 4; j++) {
						tile = this.collection.findWhere({
							x: i,
							y: j
						});
						this.$el.append(new TileView({
							model: tile
						}).render().$el);
					}
				}
				return this;
			},
			start: function() {
				this.randomTile(2);
				this.highlightEdges();
			},
			randomTile: function(num) {
				num = num ? num : 1;
				var emptyTiles = this.collection.emptyTiles();
				for (var count = 1; count <= num; count++) {
					var chosenTile = emptyTiles[this.randomNumber(0, emptyTiles.length - 1)];
					var randomSymbols = this.seedSymbols[this.randomNumber(0, this.seedSymbols.length - 1)];
					var symbols = new Symbols();
					console.log('randomSymbols.length', randomSymbols.length);
					for (var i = 0, numOfSymbols = randomSymbols.length; i < numOfSymbols; i++) {
						var symbol = new Symbol({
							name: randomSymbols[i].name,
							value: randomSymbols[i].value
						});
						console.log(randomSymbols[i].name);
						symbols.add(symbol);
					}
					chosenTile.set({
						value: symbols.sum(),
						symbols: symbols
					}, {
						silent: true
					});
					chosenTile.trigger('appear');
				}
			},
			randomNumber: function(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			highlightEdges: function() {
				var edgesDetected = false;
				var nonEmptyTiles = this.collection.nonEmptyTiles();
				for (var i = 0; i < nonEmptyTiles.length; i++) {
					if (this.collection.detectEdges(nonEmptyTiles[i])) {
						edgesDetected = true;
					}
					console.log(nonEmptyTiles[i].get('edges'));
					console.log(nonEmptyTiles[i].get('symbols'));
				}
				return edgesDetected;
			},
			move: function(dir) {
				var moves = {
					'r': this.moveRight,
					'l': this.moveLeft,
					'u': this.moveUp,
					'd': this.moveDown
				};
				moves[dir]();
			},
			moveRight: function() {
				
				console.log('right');
			},
			moveLeft: function() {
				console.log('left');
			},
			moveUp: function() {
				console.log('up');
			},
			moveDown: function() {
				console.log('down');
			}
		});
		return GameView;
	});