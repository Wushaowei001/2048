define(['backbone', 'model/tile'], function(Backbone, Tile) {
	var Tiles = Backbone.Collection.extend({
		model: Tile,
		emptyTiles: function() {
			return this.where({
				value: 0
			});
		},
		nonEmptyTiles: function() {
			return this.filter(function(tile) {
				return tile.get('value') != 0;
			});
		},
		detectEdges: function(tile) {
			var edges = [];
			var rT = this.nonEmptyTileTowardsRight(tile);
			var lT = this.nonEmptyTileTowardsLeft(tile);
			var bT = this.nonEmptyTileTowardsBottom(tile);
			var uT = this.nonEmptyTileTowardsTop(tile);


			if (rT != null && rT.canMerge(tile)) {
				edges.push('right');
			}

			if (lT != null && lT.canMerge(tile)) {
				edges.push('left');
			}

			if (bT != null && bT.canMerge(tile)) {
				edges.push('bottom');
			}

			if (uT != null && uT.canMerge(tile)) {
				edges.push('top');
			}

			tile.set('edges', edges);
			return edges.length > 0 ? true : false;
		},
		nonEmptyTileTowardsRight: function(tile) {
			var row = tile.get('x');
			var col = tile.get('y') + 1;
			for (; col < 4; col++) {
				var nxtTile = this.findWhere({
					x: row,
					y: col
				});
				if (nxtTile.get('value') != 0) {
					return nxtTile;
				}
			}
			return null;
		},
		nonEmptyTileTowardsLeft: function(tile) {
			var row = tile.get('x'),
				col;
			for (col = tile.get('y') - 1; col >= 0; col--) {
				var nxtTile = this.findWhere({
					x: row,
					y: col
				});
				if (nxtTile.get('value') != 0) {
					return nxtTile;
				}
			}
			return null;
		},
		nonEmptyTileTowardsTop: function(tile) {
			var col = tile.get('y'),
				row;
			for (row = tile.get('x') - 1; row >= 0; row--) {
				var nxtTile = this.findWhere({
					x: row,
					y: col
				});
				if (nxtTile.get('value') != 0) {
					return nxtTile;
				}
			}
			return null;
		},
		nonEmptyTileTowardsBottom: function(tile) {
			var col = tile.get('y'),
				row;
			for (row = tile.get('x') + 1; row < 4; row++) {
				var nxtTile = this.findWhere({
					x: row,
					y: col
				});
				if (nxtTile.get('value') != 0) {
					return nxtTile;
				}
			}
			return null;
		},
	});
	return Tiles;
});