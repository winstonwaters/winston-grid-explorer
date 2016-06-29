module.explorts = Backbone.View.extend({
  initialize: function() {
    this.model.on('change', this.render, this);
  },
  events: {
    'click #restart': 'clickRestart',
  },

  clickRestart: function() {
    console.log('restart');
      this.model.restart();
  },
  render: function(){
    
  }
});
