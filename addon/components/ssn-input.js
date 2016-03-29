import Ember from 'ember';
import InputMaskComponent from 'ember-inputmask/components/input-mask';

/**
 * `{{ssn-input}}` component
 *  Displays an input that masks SSN format
 */

export default InputMaskComponent.extend({
  mask: '999-99-9999',

  updateMask() {
    this.set('mask', '999-99-9999');
    this._super();
  },

  _maskShouldChange: Ember.observer('mask', function() {
    Ember.run.once(this, 'updateMask');
  })
});
