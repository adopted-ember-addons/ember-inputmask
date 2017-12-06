import OneWayInputMask from 'ember-inputmask/components/one-way-input-mask';
import { get, set } from '@ember/object';
import { isBlank } from '@ember/utils';

const DEFAULT_OPTIONS = {
  groupSeparator: ',',
  radixPoint: '.',
  groupSize: '3',
  autoGroup: true,
};

export default OneWayInputMask.extend({
  /**
   * @override
   */
  mask: 'integer',

  /**
   * Set this to true to include decimals
   */
  decimal: false,

  init() {
    this._super(...arguments);

    set(this, 'options', Object.assign({}, get(this, 'options'), DEFAULT_OPTIONS));

    if (get(this, 'decimal')) {
      set(this, 'mask', 'decimal');

      // Give default digits if we don't have them aleady
      if (isBlank(get(this, 'options.digits'))) {
        set(this, 'options.digits', 2);
      }
    }
  },
});
