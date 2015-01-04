module.exports = {
  name: 'ember-inputmask',

  included: function(app) {
    this._super.included(app);

    app.import('bower_components/jquery.inputmask');
  }
};