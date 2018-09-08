import OneWayInputMask from 'ember-inputmask/components/one-way-input-mask';

/**
 * `{{one-way-email-mask}}` component.
 *
 * Displays an input that masks to email
 *
 * @class OneWayEmailMask
 */
export default OneWayInputMask.extend({
  /**
   * @override
   */
  mask: 'email',
});
