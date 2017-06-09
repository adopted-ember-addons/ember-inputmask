module.exports = {
    normalizeEntityName: function() {},
    afterInstall: function(options) {
      return this.addBowerPackageToProject('inputmask', '3.2.7');
    }
};
