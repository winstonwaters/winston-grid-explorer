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
