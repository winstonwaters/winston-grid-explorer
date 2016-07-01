(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

module.exports = Backbone.Collection.extend({
  url: 'http://grid.queencityiron.com/api/highscore',

  model: {
    name: '',
    score: '',
    playerType: '',
  },

});

},{}],2:[function(require,module,exports){
'use strict';

var MyRouter = require('./router');

window.addEventListener('load', function () {
  console.log('I am functional');
  var GameRouter = new MyRouter();
  Backbone.history.start();
});
},{"./router":4}],3:[function(require,module,exports){
let HighScoreCollection = require('../collections/highscore.collection');

module.exports = Backbone.Model.extend({
  initialize: function () {
    this.highscores = new HighScoreCollection();
  },

  defaults:{
    xvalue: 0,
    yvalue: 0,
    username: '',
    energy: 100,
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
   if (this.get('yvalue') > 1 && this.get('size')==='big') {
   this.set('yvalue', this.get('yvalue') - 1);
   this.set('energy', this.get('energy') - 5);
   }
   else if (this.get('yvalue') > 1 && this.get('size') === 'small'){
   this.set('yvalue', this.get('yvalue') - 2);
   this.set('energy', this.get('energy') - 10);
   }
   if (this.gameover()){
     console.log('player is dying');
     this.trigger('playerdied')
   }
 },


left: function() {
   if (this.get('xvalue') > 1 && this.get('size')==='big') {
   this.set('xvalue', this.get('xvalue') - 1);
   this.set('energy', this.get('energy') - 5);
   }
   else if (this.get('xvalue') > 1 && this.get('size') === 'small'){
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

 getHighScores: function () {
   this.highscores.fetch({
     success: function() {
       this.highscores.trigger('available');
     },
   });
 },


});

},{"../collections/highscore.collection":1}],4:[function(require,module,exports){
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

      // let highscores = new HighscoreCollection();
      // highscores.fetch();

      // collection
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
  this.end.el.classList.add('hidden');
}

});

},{"./collections/highscore.collection.js":1,"./model/directionmodel":3,"./view/directionview":5,"./view/endview":6,"./view/playerview":7}],5:[function(require,module,exports){
module.exports = Backbone.View.extend({

    initialize: function () {
      this.model.on('change', this.render, this);
    },

  events: {
    //event name selector : function to call
    'click #up' : 'clickUp',
    'click #down' : 'clickDown',
    'click #left' : 'clickLeft',
    'click #right' : 'clickRight',
  },

  clickUp: function () {
    console.log('hey up1');
    this.model.up();
  },

  clickDown: function () {
    this.model.down();
  },

  clickLeft: function () {
    this.model.left();
  },

  clickRight: function () {
    this.model.right();
  },


  //dynamically appending grid to play in the DOM
  makeGrid: function () {
    let myGrid = document.getElementById('grid')
    myGrid.innerHTML = '';
    console.log('making grid');
    let playerPosition = [5,7]
    let size = 10;
    for(var y = 0; y < size; y++){
      let row = document.createElement('div');
      row.classList.add('row');
      for(let x = 0; x < size; x++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        row.appendChild(cell);
      }
      myGrid.appendChild(row);
    }
   },

  render: function () {
    let buttonRight = this.el.querySelector('#xAxis');
    buttonRight.textContent = this.model.get('xvalue');

    let buttonUp = this.el.querySelector('#yAxis');
    buttonUp.textContent = this.model.get('yvalue');

    this.makeGrid();
  }


});

},{}],6:[function(require,module,exports){
module.exports = Backbone.View.extend({
  initialize: function() {
    // this.model.on('changed', this.render, this);
    this.model.highscores.on('available', this.render, this);
  },

  events: {
    'click #restart': 'clickRestart',
    'gameOver': 'theEnd',
  },

  clickRestart: function() {
    console.log(this);
    window.location.href = '/#MainGame';
  },
  render: function(){
    console.log('rendering');
    console.log(this.model.highscores);
  }
});

},{}],7:[function(require,module,exports){
module.exports = Backbone.View.extend({

  initialize: function () {
    this.model.on('change', this.render, this);
  },


  events: {
    //event name selector : function to call
    'click #start' : 'clickStart',
    'click #input' : 'clickInput',
    'click #big' : 'clickBig',
    'click #small' : 'clickSmall',
  },

  clickBig: function () {
    console.log('view click size please big')
    this.model.size('big');
  },

  clickSmall: function () {
    this.model.size('small');
  },

  clickStart: function(){
    let input = document.getElementById('input');
    this.model.start(input.value);
    console.log(this.model);
    this.trigger('startgame')
  },

  clickInput: function(){
    let input = document.getElementById('input')
    input.addEventListener('click',function(){
      input.value = ""
    })
  },

  render: function() {
      let view = document.getElementById('ul');
      let name = this.model.get("username");
      view.innerHTML = name;
      let size = this.model.get('size');
      console.log(size);
  },



});

},{}]},{},[2])