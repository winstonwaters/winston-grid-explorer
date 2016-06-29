module.exports = Backbone.Model.extend({
  url: ,

  defaults: {
    name: '',
    size: '',
  },

  addUser: function (name, size) {
    this.set('name');
    this.set('size');

    console.log('calling save()')

    this.save();
  }
})
