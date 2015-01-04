/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-inputmask',
  included: function(app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/jquery.inputmask/dist/jquery.inputmask.bundle.min.js');
  }
};
