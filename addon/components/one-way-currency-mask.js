import OneWayInputMask from 'ember-inputmask/components/one-way-input-mask';

/**
 * `{{one-way-currency-mask}}` component.
 *
 * Displays an input that masks to currency
 */
export default OneWayInputMask.extend({
  /**
   * @override
   */
  mask: 'currency',
});
