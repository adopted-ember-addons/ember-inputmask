module.exports = {
    normalizeEntityName: function() {},
    afterInstall: function(options) {
      return this.addBowerPackageToProject('jquery.inputmask', '3.2.3');
    }
};
