import OneWayInputMask from 'ember-inputmask/components/one-way-input-mask';

/**
 * `{{one-way-currency-mask}}` component.
 *
 * Displays an input that masks to currency
 *
 * @class OneWayCurrencyMask
 */
export default OneWayInputMask.extend({
  /**
   *
   * @field mask
   * @override
   */
  mask: 'currency',
});
