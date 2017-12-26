import { once } from '@ember/runloop';
import { observer } from '@ember/object';
import InputMaskComponent from 'ember-inputmask/components/input-mask';

/**
 * `{{zip-code-input}}` component.
 *
 * Displays an input that masks a US ZIP code.
 *
 * Future: Add config options that allow users to set locality
 * app wide.
 *
 * OPTIONS:
 *   fullCode - bool
 *     Allows users to optionally enter the full ZIP+4 area code.
 */

export default InputMaskComponent.extend({
  mask:    '99999',

  fullCode: false,

  oldComponent: '{{zip-code-input}}',
  newComponent: '{{one-way-zip-code-mask}}',

  updateMask: function() {
    if (this.get('fullCode')) {
      this.set('mask', '99999[-9999]');
    }

    this._super();
  },

  _maskShouldChange: observer('mask', 'fullCode', function() {
    once(this, 'updateMask');
  })
});
