define([ 'backbone', 'model/tile' ], function(Backbone, Tile) {

	var Tiles = Backbone.Collection.extend({
		model : Tile,

		mergeTile : function(tile, nonEmptyTile, emptyTile) {
			var isMerged = false;
			if (nonEmptyTile != null && nonEmptyTile.canMerge(tile)) {
				nonEmptyTile.merge(tile);
				isMerged = true;
			} else if (emptyTile != null) {
				emptyTile.merge(tile);
				isMerged = true;
			} else {
				// no matching tile to merge.
			}
			return isMerged;
		},

		moveToFarRight : function(tile) {
			var firstNonEmptyTile = null, farEmptyTile = null, j, i, nxtTile;
			i = tile.get('x');
			for (j = tile.get('y') + 1; j < 4; j++) {
				nxtTile = this.findWhere({
					x : i,
					y : j
				});
				if (nxtTile.get('value') != 0) {
					firstNonEmptyTile = nxtTile;
					break;
				}
			}

			for (j = firstNonEmptyTile != null ? firstNonEmptyTile.get('y') - 1
					: 3; j > tile.get('y'); j--) {
				nxtTile = this.findWhere({
					x : i,
					y : j
				});
				if (nxtTile.get('value') == 0) {
					farEmptyTile = nxtTile;
					break;
				}
			}
			return this.mergeTile(tile, firstNonEmptyTile, farEmptyTile);
		},

		moveToFarLeft : function(tile) {
			var firstNonEmptyTile = null, farEmptyTile = null, j, i, nxtTile;
			i = tile.get('x');
			for (j = tile.get('y') - 1; j >= 0; j--) {
				nxtTile = this.findWhere({
					x : i,
					y : j
				});
				if (nxtTile.get('value') != 0) {
					firstNonEmptyTile = nxtTile;
					break;
				}
			}

			for (j = firstNonEmptyTile != null ? firstNonEmptyTile.get('y') + 1
					: 0; j < tile.get('y'); j++) {
				nxtTile = this.findWhere({
					x : i,
					y : j
				});
				if (nxtTile.get('value') == 0) {
					farEmptyTile = nxtTile;
					break;
				}
			}

			return this.mergeTile(tile, firstNonEmptyTile, farEmptyTile);
		},

		moveToFarUp : function(tile) {
			var firstNonEmptyTile = null, farEmptyTile = null, j, i, nxtTile;
			j = tile.get('y');
			for (i = tile.get('x') - 1; i >= 0; i--) {
				nxtTile = this.findWhere({
					x : i,
					y : j
				});
				if (nxtTile.get('value') != 0) {
					firstNonEmptyTile = nxtTile;
					break;
				}
			}

			for (i = firstNonEmptyTile != null ? firstNonEmptyTile.get('x') + 1
					: 0; i < tile.get('x'); i++) {
				nxtTile = this.findWhere({
					x : i,
					y : j
				});
				if (nxtTile.get('value') == 0) {
					farEmptyTile = nxtTile;
					break;
				}
			}

			return this.mergeTile(tile, firstNonEmptyTile, farEmptyTile);
		},

		moveToFarDown : function(tile) {
			var firstNonEmptyTile = null, farEmptyTile = null, j, i, nxtTile;
			j = tile.get('y');
			for (i = tile.get('x') + 1; i < 4; i++) {
				nxtTile = this.findWhere({
					x : i,
					y : j
				});
				if (nxtTile.get('value') != 0) {
					firstNonEmptyTile = nxtTile;
					break;
				}
			}

			for (i = firstNonEmptyTile != null ? firstNonEmptyTile.get('x') - 1
					: 3; i > tile.get('x'); i--) {
				nxtTile = this.findWhere({
					x : i,
					y : j
				});
				if (nxtTile.get('value') == 0) {
					farEmptyTile = nxtTile;
					break;
				}
			}

			return this.mergeTile(tile, firstNonEmptyTile, farEmptyTile);
		}
	});

	return Tiles;
});