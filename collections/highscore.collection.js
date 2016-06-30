var HighscoreModel = require('../model/highscoremodel');


module.exports = Backbone.Collection.extend({
  url: 'http://grid.queencityiron.com/api/highscore',

  model: HighscoreModel;

});
