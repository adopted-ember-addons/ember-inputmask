/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-inputmask',
  included: function(app) {
    this._super.included.apply(this, arguments);
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }
    app.import('vendor/inputmask/extra/dependencyLibs/inputmask.dependencyLib.js');
    app.import('vendor/inputmask/dist/inputmask/inputmask.js');
    app.import('vendor/inputmask/dist/inputmask/inputmask.extensions.js');
    app.import('vendor/inputmask/dist/inputmask/inputmask.date.extensions.js');
    app.import('vendor/inputmask/dist/inputmask/inputmask.numeric.extensions.js');
    app.import('vendor/inputmask/dist/inputmask/inputmask.phone.extensions.js');
    app.import('vendor/inputmask/dist/inputmask/inputmask.regex.extensions.js');
  },
  treeForVendor: function(vendorTree) {
    var inputmaskPath = path.dirname(require.resolve('jquery.inputmask'));
    var inputmaskTree = new Funnel(inputmaskPath, {
      files: ['extra/dependencyLibs/inputmask.dependencyLib.js',
        'dist/inputmask/inputmask.js',
        'dist/inputmask/inputmask.extensions.js',
        'dist/inputmask/inputmask.date.extensions.js',
        'dist/inputmask/inputmask.numeric.extensions.js',
        'dist/inputmask/inputmask.phone.extensions.js',
        'dist/inputmask/inputmask.regex.extensions.js'],
      destDir: '/inputmask'
    });
    var trees = [vendorTree, inputmaskTree];
    return new MergeTrees(trees, {
      annotation: 'ember-inputmask: treeForVendor'
    });
  }
};
