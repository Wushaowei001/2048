define(['jquery', 'underscore', 'backbone', 'view/GameView', 'model/tiles',
    'model/tile', 'model/symbols', 'model/game', 'view/scoreView',
    //  'text!templates/over.html', 
    'swipe'
], function($, _, Backbone, GameView, Tiles,
    Tile, Symbols, Game, ScoreView) {

    var ApplicationView = Backbone.View.extend({
        el: 'body',
        initialize: function() {

            //initialize game model
            this.game = new Game();

            //initialize game view with game model
            this.gameView = new GameView({
                model: this.game,

                //create seedData
                collection: this.seedData()

            });

            // render view
            this.render();

        },

        render: function() {

            // render game view
            this.$el.find('.pad').empty().append(this.gameView.render().$el);

            // start game
            this.gameView.start();
        },
        seedData: function() {
            var i;
            var j;
            var tile;
            var tiles = new Tiles();
            for (i = 0; i < 4; i++) {
                for (j = 0; j < 4; j++) {
                    tile = new Tile({
                        x: i,
                        y: j,
                        value: 0,
                        symbols: new Symbols(),
                        edges: []
                    });

                    tiles.add(tile);

                }
            }

            return tiles;

        }


    });

    return ApplicationView;

});