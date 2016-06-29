module.exports = Backbone.View.extend({

  initialize: function () {
    this.model.on('change', this.render, this);
  },


  events: {
    //event name selector : function to call
    'click #start' : 'clickStart',
  },

  clickStart: function(){
    let input = document.getElementById('input');
    this.model.start(input.value);

  },

  render: function() {
      let view = document.getElementById('ul');
      let name = this.model.get("username");
      view.innerHTML = name;
      input.style.background = "lightblue";
      input.style.color = "white";
  },

});
