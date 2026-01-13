import OneWayInputMask from './one-way-input-mask.js';

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
