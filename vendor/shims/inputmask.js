/* global define */
(function() {
  function vendorModule() {
    'use strict';

    // Export of the inputmask module
    return {
      'default': self['Inputmask'],
      __esModule: true,
    };
  }

  // Define inputmask AMD module
  define('inputmask', [], vendorModule);
})();
