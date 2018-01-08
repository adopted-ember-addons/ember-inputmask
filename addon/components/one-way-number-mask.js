import OneWayInputMask, { DEFAULT_NON_BOUND_PROPS } from 'ember-inputmask/components/one-way-input-mask';
import { get, set } from '@ember/object';
import { isBlank } from '@ember/utils';

const DEFAULT_OPTIONS = {
  groupSeparator: ',',
  radixPoint: '.',
  groupSize: '3',
  autoGroup: true,
};

export default OneWayInputMask.extend({
  NON_ATTRIBUTE_BOUND_PROPS: DEFAULT_NON_BOUND_PROPS.concat('decimal'),

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

    set(this, '_options', Object.assign({}, get(this, '_options'), DEFAULT_OPTIONS));

    if (get(this, 'decimal')) {
      set(this, 'mask', 'decimal');

      // Give default digits if we don't have them aleady
      if (isBlank(get(this, 'options.digits'))) {
        set(this, '_options.digits', 2);
      }
    }
  },
});
