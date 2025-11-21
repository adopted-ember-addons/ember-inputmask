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
   * Set this to true to include decimals
   *
   * @argument decimal
   * @type Boolean
   */
  decimal = false;

  constructor() {
    super(...arguments);

    set(this, '_options', Object.assign({}, this._options, DEFAULT_OPTIONS));

    // Set mask if not explicitly provided
    if (isBlank(this.mask)) {
      set(this, 'mask', this.decimal ? 'decimal' : 'integer');
    }

    if (this.decimal) {
      // Give default digits if we don't have them already
      if (!this.options || isBlank(this.options.digits)) {
        set(this, '_options.digits', 2);
      }
    }
  }

  didReceiveAttrs() {
    super.didReceiveAttrs();

    // Ensure digits is set when decimal is true and not explicitly provided
    if (this.decimal && (!this.options || isBlank(this.options.digits))) {
      if (isBlank(this._options.digits)) {
        set(this, '_options.digits', 2);
      }
    }
  }
}
