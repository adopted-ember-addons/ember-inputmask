'use strict';


module.exports = {
  name: 'ember-inputmask',

  included() {
    const dependencies = Object.keys(this.project.dependencies());
    const hasFastboot = dependencies.includes('ember-cli-fastboot');

    const importOptions = {};
    if (hasFastboot) {
      importOptions.using = [{ transformation: 'fastbootShim' }];
    }

    this.import('node_modules/inputmask/dist/inputmask/dependencyLibs/inputmask.dependencyLib.js', importOptions);
    this.import('node_modules/inputmask/dist/inputmask/inputmask.js', importOptions);
    this.import('node_modules/inputmask/dist/inputmask/inputmask.extensions.js', importOptions);
    this.import('node_modules/inputmask/dist/inputmask/inputmask.date.extensions.js', importOptions);
    this.import('node_modules/inputmask/dist/inputmask/inputmask.numeric.extensions.js', importOptions);
  }
};
