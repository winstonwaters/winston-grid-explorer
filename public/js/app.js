(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var MyRouter = require('./router');

window.addEventListener('load', function () {
  console.log('I am functional');
  var GameRouter = new MyRouter();
  Backbone.history.start();
});
},{"./router":3}],2:[function(require,module,exports){
module.exports = Backbone.Model.extend({
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


});

},{}],3:[function(require,module,exports){
var DirectionModel = require('./model/directionmodel');
//three views
var DirectionView = require('./view/directionview');
var PlayerView = require('./view/playerview');
var EndView = require('./view/endview');


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

},{"./model/directionmodel":2,"./view/directionview":4,"./view/endview":5,"./view/playerview":6}],4:[function(require,module,exports){
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

  render: function () {
    let buttonRight = this.el.querySelector('#xAxis');
    buttonRight.textContent = this.model.get('xvalue');

    let buttonUp = this.el.querySelector('#yAxis');
    buttonUp.textContent = this.model.get('yvalue');
  }


});

},{}],5:[function(require,module,exports){
module.exports = Backbone.View.extend({
  initialize: function() {
    this.model.on('change', this.render, this);
  },
  events: {
    'click #restart': 'clickRestart',
    'gameOver': 'theEnd',
  },

  clickRestart: function() {
    console.log(this);
    window.location.href = '#/MainGame';
  },
  render: function(){

  }
});

},{}],6:[function(require,module,exports){
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

},{}]},{},[1])