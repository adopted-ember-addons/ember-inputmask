/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-inputmask',
  options: {
    nodeAssets: {
      'jquery.inputmask': {
        vendor: [
          'extra/dependencyLibs/inputmask.dependencyLib.js',
          'dist/inputmask/inputmask.js',
          'dist/inputmask/inputmask.extensions.js',
          'dist/inputmask/inputmask.date.extensions.js',
          'dist/inputmask/inputmask.numeric.extensions.js',
          'dist/inputmask/inputmask.phone.extensions.js',
          'dist/inputmask/inputmask.regex.extensions.js'
        ]
      }
    }
  },
  included() {
    this._super.included.apply(this, arguments);
    this.import('vendor/jquery.inputmask/extra/dependencyLibs/inputmask.dependencyLib.js');
    this.import('vendor/jquery.inputmask/dist/inputmask/inputmask.js');
    this.import('vendor/jquery.inputmask/dist/inputmask/inputmask.extensions.js');
    this.import('vendor/jquery.inputmask/dist/inputmask/inputmask.date.extensions.js');
    this.import('vendor/jquery.inputmask/dist/inputmask/inputmask.numeric.extensions.js');
    this.import('vendor/jquery.inputmask/dist/inputmask/inputmask.phone.extensions.js');
    this.import('vendor/jquery.inputmask/dist/inputmask/inputmask.regex.extensions.js');
  }
};
