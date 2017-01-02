define(
	['backbone', 'model/symbols', 'model/symbol'],
	function(Backbone, Symbols, Symbol) {
		var Tile = Backbone.Model.extend({
			defaults: {
				value: 0,
				x: 0,
				y: 0,
				edges: []
			},
			canMerge: function(oTile) {
				console.log(this.get('value')+' ' + oTile.get('value'));
				return this.get('value') == oTile.get('value') && this.containSymbol(oTile);
			},

			containSymbol: function(oTile) {
				var oSymbols = oTile.get('symbols').pluck('name');
				var symbols = this.get('symbols').pluck('name');
				console.log(oSymbols,symbols);
				console.log('_.intersection(symbols, oSymbols',_.intersection(symbols, oSymbols));
				return _.intersection(symbols, oSymbols).length > 0;
			}
		});
		return Tile;
	});