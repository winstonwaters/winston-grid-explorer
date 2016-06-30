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
    window.location.href = '#/MainGame';
  },
  render: function(){
    console.log('rendering');
    console.log(this.model.highscores);
  }
});
