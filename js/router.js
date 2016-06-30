//one model
var DirectionModel = require('./model/directionmodel');
var HighscoreCollection = require('./collections/highscore.collection.js');
//three views
var DirectionView = require('./view/directionview');
var PlayerView = require('./view/playerview');
var EndView = require('./view/endview');


module.exports = Backbone.Router.extend({
 initialize: function() {
      //Models
      let dmodel = new DirectionModel();

      //collection
      // let highscores = new HighscoreCollection();
      //
      // this.highscorescollection = highscores.fetch().then(function(data){
      //   return data;
      // });
      // console.log(this.highscorescollection);

      //Views
      this.player = new PlayerView({
          model: dmodel,
          el: document.getElementById('player-view'),
      });

      this.direction = new DirectionView({
          model: dmodel,
          el: document.getElementById('direction-view')
      });

      this.end = new EndView({
          model: dmodel,
          el: document.getElementById('end-view')
      });

      dmodel.on('playerdied', function(){
        console.log(this.navigate);
        this.navigate('EndGame', { trigger : true })
      },this)

      this.player.on('startgame', function(){
        console.log(this.navigate);
        this.navigate('playGame', { trigger : true })
      },this)
 },
 routes: {
    "MainGame": "mainGame",
    "playGame": "playGame",
    "EndGame": "endGame",
    "restart": "restart",
    '' : 'mainGame',
 },

mainGame: function(){
  console.log('main game starting')
  this.player.el.classList.remove('hidden');
  this.direction.el.classList.add('hidden');
  this.end.el.classList.add('hidden');
},

playGame: function(){
  console.log('play game starting')
  this.player.el.classList.add('hidden');
  this.direction.el.classList.remove('hidden');
  this.end.el.classList.add('hidden');
},

endGame: function(){
  console.log('end game starting')
  this.player.el.classList.add('hidden');
  this.direction.el.classList.add('hidden');
  this.end.el.classList.remove('hidden');
},



restart: function(){
  console.log('hello restart')
  this.player.el.classList.remove('hidden');
  this.direction.el.classList.add('hidden');
}

});
