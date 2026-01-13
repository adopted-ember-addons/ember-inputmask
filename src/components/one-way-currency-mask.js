import OneWayInputMask from 'ember-inputmask/components/one-way-input-mask';

/**
 * @class OneWayCurrencyMask
 */
export default class OneWayCurrencyMask extends OneWayInputMask {
  /**
   *
   * @field mask
   * @override
   */
  mask = 'currency';
}
