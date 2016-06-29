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
      input.style.background = "lightblue";
      input.style.color = "white";
      let size = this.model.get('size');
      console.log(size);
      // document.getElementById(size).style.background = 'lightgray';

  },

});
