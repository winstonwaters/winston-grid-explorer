var DirectionModel = require('./model/directionmodel');
var DirectionView = require('./view/directionview');
var PlayerView = require('./view/playerview');


module.exports = Backbone.Router.extend({
 initialize: function() {
      //Models
      let dmodel = new DirectionModel();

      //Views
      this.player = new PlayerView({
          model: dmodel,
          el: document.getElementById('player-view'),
      });

      this.direction = new DirectionView({
          model: dmodel,
          el: document.getElementById('direction-view')
      });
 },
 routes: {
    "MainGame": "mainGame",
    "restart": "restart",
    " ": "restart",
 },

mainGame: function(){
  console.log('main game starting')
  this.player.el.classList.add('hidden');
  this.direction.el.classList.remove('hidden');
},
restart: function(){
  console.log('hello restart')
  this.direction.el.classList.add('hidden')
  this.player.el.classList.remove('hidden')
}

});
