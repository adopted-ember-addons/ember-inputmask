import InputMaskComponent from 'ember-inputmask/components/input-mask';

/**
 * `{{currency-input}}` component.
 *
 * Displays an input that masks to currency
 *
 * @class CurrencyInput
 */
export default InputMaskComponent.extend({
  oldComponent: '{{currency-input}}',
  newComponent: '{{one-way-currency-mask}}',
  mask: 'currency'
});
