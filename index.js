/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-inputmask',
  included: function(app) {
    this._super.included(app);
    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import(app.bowerDirectory + '/jquery.inputmask/dist/min/jquery.inputmask.bundle.min.js');
    }
  }
};
