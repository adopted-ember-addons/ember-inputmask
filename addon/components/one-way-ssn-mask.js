import OneWayInputMask from 'ember-inputmask/components/one-way-input-mask';

/**
 * `{{one-way-ssn-mask}}` component
 *  Displays an input that masks SSN format
 * 
 * @class OneWaySSNMask
 */
export default OneWayInputMask.extend({
  /**
   * @override
   */
  mask: '999-99-9999',
});
