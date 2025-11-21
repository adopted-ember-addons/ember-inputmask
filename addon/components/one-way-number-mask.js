import OneWayInputMask, {
  DEFAULT_NON_BOUND_PROPS,
} from 'ember-inputmask/components/one-way-input-mask';
import { set } from '@ember/object';
import { isBlank } from '@ember/utils';

const DEFAULT_OPTIONS = {
  groupSeparator: ',',
  radixPoint: '.',
  groupSize: '3',
  autoGroup: true,
};

/**
 * @class OneWayNumberMask
 */
export default class OneWayNumberMask extends OneWayInputMask {
  NON_ATTRIBUTE_BOUND_PROPS = DEFAULT_NON_BOUND_PROPS.concat('decimal');

  /**
   * @field mask
   * @override
   */
  mask = 'integer';

  /**
   * Set this to true to include decimals
   *
   * @argument decimal
   * @type Boolean
   */
  decimal = false;

  constructor() {
    super(...arguments);

    set(this, '_options', Object.assign({}, this._options, DEFAULT_OPTIONS));

    if (this.decimal) {
      set(this, 'mask', 'decimal');

      // Give default digits if we don't have them already
      if (!this.options || isBlank(this.options.digits)) {
        set(this, '_options.digits', 2);
      }
    }
  }
}
