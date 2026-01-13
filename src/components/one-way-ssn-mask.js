import OneWayInputMask from 'ember-inputmask/components/one-way-input-mask';

/**
 * @class OneWaySSNMask
 */
export default class OneWaySsnMask extends OneWayInputMask {
  /**
   * @field mask
   * @override
   */
  mask = '999-99-9999';
}
