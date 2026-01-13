import OneWayInputMask from './one-way-input-mask.js';
import { set } from '@ember/object';

const DEFAULT_OPTIONS = {
  inputFormat: 'dd/mm/yyyy',
  outputFormat: 'ddmmyyyy',
};

/**
 * @class OneWayDateMask
 */
export default class OneWayDateMask extends OneWayInputMask {
  /**
   * @field mask
   * @override
   */
  mask = 'datetime';

  constructor() {
    super(...arguments);

    set(this, '_options', Object.assign({}, this._options, DEFAULT_OPTIONS));
  }
}
