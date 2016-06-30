module.exports = Backbone.Model.extend({
  url: 'http://grid.queencityiron.com/api/highscore',

  defaults: {
    name: '',
    score: '',
    playerType: '',
  },

  addUser: function (name, size) {
    this.set('name');
    this.set('score');
    this.set('playerType');

    console.log('calling save()')

    this.save();
  }
})
