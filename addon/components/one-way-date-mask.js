import OneWayInputMask from 'ember-inputmask/components/one-way-input-mask';
import { set } from '@ember/object';

const DEFAULT_OPTIONS = {
  inputFormat: 'dd/mm/yyyy',
  outputFormat: 'ddmmyyyy',
};

/**
 * @class OneWayDateMask
 */
export default OneWayInputMask.extend({
  /**
   * @field mask
   * @override
   */
  mask: 'datetime',

  init() {
    this._super(...arguments);

    set(this, '_options', Object.assign({}, this._options, DEFAULT_OPTIONS));
  },
});
