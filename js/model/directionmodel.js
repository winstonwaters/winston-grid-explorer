let HighScoreCollection = require('../collections/highscore.collection');

module.exports = Backbone.Model.extend({
  initialize: function () {
    this.highscores = new HighScoreCollection();
  },

  defaults:{
    xvalue: 0,
    yvalue: 0,
    username: '',
    energy: 50,
    size: '',
    amountToMove: 0,
    energyPerMove: 0,
  },

  //start
  start: function(input) {
    this.set('username',input);
  },

  size: function(size) {
    console.log("model size", size);
    this.set('size', size);
    if (this.get('size') === ('big')){
      this.set('energy',150);
    }
   else if(this.get('size')===('small')){
     this.set('energy',100);
   }
   console.log(this.get('energy'));
  },


  gameover: function(){
    if(this.get('energy') < 0) {
      console.log('die');
      /// todo: this isn't the best because there are lots of places
      // where 'playerdied' happens.
      this.getHighScores();
      this.trigger('playerdied')
    }
  },


  up: function() {
   if (this.get('yvalue') < 10 && this.get('size')==='big') {
   this.set('yvalue', this.get('yvalue') + 1);
   this.set('energy', this.get('energy') - 5);
   }
   else if (this.get('yvalue') < 10 && this.get('size') === 'small'){
   this.set('yvalue', this.get('yvalue') + 2);
   this.set('energy', this.get('energy') - 10);
   }
   if (this.gameover()){
     console.log('player is dying');
     this.trigger('playerdied')
   }
 },


down: function() {
   if (this.get('yvalue') > - 10 && this.get('size')==='big') {
   this.set('yvalue', this.get('yvalue') - 1);
   this.set('energy', this.get('energy') - 5);
   }
   else if (this.get('yvalue') > - 10 && this.get('size') === 'small'){
   this.set('yvalue', this.get('yvalue') - 2);
   this.set('energy', this.get('energy') - 10);
   }
   if (this.gameover()){
     console.log('player is dying');
     this.trigger('playerdied')
   }
 },


left: function() {
   if (this.get('xvalue') > - 10 && this.get('size')==='big') {
   this.set('xvalue', this.get('xvalue') - 1);
   this.set('energy', this.get('energy') - 5);
   }
   else if (this.get('xvalue') > - 10 && this.get('size') === 'small'){
   this.set('xvalue', this.get('xvalue') - 2);
   this.set('energy', this.get('energy') - 10);
   }
   if (this.gameover()){
     console.log('player is dying');
     this.trigger('playerdied')
   }
 },



right: function() {
   if (this.get('xvalue') < 10 && this.get('size')==='big') {
   this.set('xvalue', this.get('xvalue') + 1);
   this.set('energy', this.get('energy') - 5);
   }
   else if (this.get('xvalue') < 10 && this.get('size') === 'small'){
   this.set('xvalue', this.get('xvalue') + 2);
   this.set('energy', this.get('energy') - 10);
   }
   if (this.gameover()){
     console.log('player is dying');
     this.trigger('playerdied')
   }
 },

 consumeEnergy: function(){
   if(this.get('energy') <= 0){
     console.log('ya died');
     this.trigger('playerdied')
     this.save();
   }
 },

 getHighScores: function () {
   this.highscores.fetch({
     success: function() {
       this.highscores.trigger('available');
     },
   });
 },


});
