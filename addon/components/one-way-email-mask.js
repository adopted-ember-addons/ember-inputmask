import OneWayInputMask from 'ember-inputmask/components/one-way-input-mask';

/**
 * @class OneWayEmailMask
 */
export default class OneWayEmailMask extends OneWayInputMask {
  /**
   * @field mask
   * @override
   */
  mask = 'email';
}
