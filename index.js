/* eslint-env node */
'use strict';

const fastbootTransform = require('fastboot-transform');

const filesToImport = [
  'dependencyLibs/inputmask.dependencyLib.js',
  'inputmask.js',
  'inputmask.extensions.js',
  'inputmask.date.extensions.js',
  'inputmask.numeric.extensions.js',
  'inputmask.phone.extensions.js'
];

module.exports = {
  name: 'ember-inputmask',
  options: {
    nodeAssets: {
      inputmask: () => ({
        vendor: {
          include: filesToImport.map(file => `dist/inputmask/${file}`),
          processTree: input => fastbootTransform(input)
        }
      })
    }
  },
  included() {
    this._super.included.apply(this, arguments);
    filesToImport.forEach(file => {
      this.import(`vendor/inputmask/dist/inputmask/${file}`);
    });
    this.import('vendor/shims/inputmask.js');
  }
};
