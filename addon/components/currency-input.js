import Ember from 'ember';
import InputMaskComponent from 'ember-inputmask/components/input-mask';

/**
 * `{{currency-input}}` component.
 *
 * Displays an input that masks to currency
 */

export default InputMaskComponent.extend({
  mask: 'currency'
});