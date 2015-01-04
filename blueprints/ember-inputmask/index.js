module.exports = {
    normalizeEntityName: function() {},
    afterInstall: function(options) {
        return this.addBowerPackageToProject('jquery.inputmask', '3.1.49');
    }
};