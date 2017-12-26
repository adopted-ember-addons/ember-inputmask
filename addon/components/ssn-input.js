import { once } from '@ember/runloop';
import { observer } from '@ember/object';
import InputMaskComponent from 'ember-inputmask/components/input-mask';

/**
 * `{{ssn-input}}` component
 *  Displays an input that masks SSN format
 */

export default InputMaskComponent.extend({
  mask: '999-99-9999',

  oldComponent: '{{ssn-input}}',
  newComponent: '{{one-way-ssn-mask}}',

  updateMask() {
    this.set('mask', '999-99-9999');
    this._super();
  },

  _maskShouldChange: observer('mask', function() {
    once(this, 'updateMask');
  })
});
