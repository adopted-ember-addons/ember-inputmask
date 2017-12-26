import OneWayInputMask from 'ember-inputmask/components/one-way-input-mask';

/**
 * `{{one-way-date-mask}}` component.
 *
 * Displays an input that masks to date
 */
export default OneWayInputMask.extend({
  /**
   * @override
   */
  mask: 'date',
});
