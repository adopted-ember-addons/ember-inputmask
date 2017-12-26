import { once } from '@ember/runloop';
import { observer } from '@ember/object';
import InputMaskComponent from 'ember-inputmask/components/input-mask';

/**
 * `{{phone-number-input}}` component.
 *
 * Displays an input that masks a US phone number. Country code
 * not included because this is specifically US formatting.
 *
 * Future: Add config options that allow users to set locality
 * app wide.
 *
 * OPTIONS:
 *   extensions - bool
 *     Allows optional extensions to be added to numbers
 */

export default InputMaskComponent.extend({
  mask:    '(299) 999-9999',

  oldComponent: '{{phone-number-input}}',
  newComponent: '{{one-way-phone-mask}}',

  updateMask: function() {
    if (this.get('extensions')) {
      this.set('mask', '(299) 999-9999[ x 9{1,4}]');
    }

    this._super();
  },

  _maskShouldChange: observer('mask', 'extensions', function() {
    once(this, 'updateMask');
  })
});
