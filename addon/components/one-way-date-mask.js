import OneWayInputMask from 'ember-inputmask/components/one-way-input-mask';
import { set } from '@ember/object';
import { assign } from '@ember/polyfills';

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

    set(this, '_options', assign({}, this._options, DEFAULT_OPTIONS));
  },
});
