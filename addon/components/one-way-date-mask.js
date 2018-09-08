import OneWayInputMask from 'ember-inputmask/components/one-way-input-mask';
import { get, set } from '@ember/object';

const DEFAULT_OPTIONS = {
  inputFormat: 'dd/mm/yyyy',
  outputFormat: 'ddmmyyyy',
};

/**
 * `{{one-way-date-mask}}` component.
 *
 * Displays an input that masks to date
 *
 * @class OneWayDateMask
 */
export default OneWayInputMask.extend({
  /**
   * @override
   */
  mask: 'datetime',

  init() {
    this._super(...arguments);

    set(this, '_options', Object.assign({}, get(this, '_options'), DEFAULT_OPTIONS));
  },
});
