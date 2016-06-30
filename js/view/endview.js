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
