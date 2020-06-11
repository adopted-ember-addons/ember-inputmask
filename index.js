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
  }
};
