import OneWayInputMask, {
  DEFAULT_NON_BOUND_PROPS
} from 'ember-inputmask/components/one-way-input-mask';
import { set } from '@ember/object';
import { isBlank } from '@ember/utils';
import { assign } from '@ember/polyfills';

const DEFAULT_OPTIONS = {
  groupSeparator: ',',
  radixPoint: '.',
  groupSize: '3',
  autoGroup: true,
};

/**
 * @class OneWayNumberMask
 */
export default OneWayInputMask.extend({
  NON_ATTRIBUTE_BOUND_PROPS: DEFAULT_NON_BOUND_PROPS.concat('decimal'),

  /**
   * @field mask
   * @override
   */
  mask: 'integer',

  /**
   * Set this to true to include decimals
   *
   * @argument decimal
   * @type Boolean
   */
  decimal: false,

  init() {
    this._super(...arguments);

    set(this, '_options', assign({}, this._options, DEFAULT_OPTIONS));

    if (this.decimal) {
      set(this, 'mask', 'decimal');

      // Give default digits if we don't have them already
      if (isBlank(this.options.digits)) {
        set(this, '_options.digits', 2);
      }
    }
  },

  /**
   * sendUpdate - Clean Integer Values
   *
   * @method sendUpdate
   * @override
   * @param  {string} unmaskedValue
   * @param  {string} value
   */
  sendUpdate(unmaskedValue, value) {
    if (!this.decimal) {
      unmaskedValue = this._cleanInteger(unmaskedValue);
      value = this._cleanInteger(value);
    }
    this.update(unmaskedValue, value);
  },

  _cleanInteger(number) {
    if (number === '0.') return '';
    return parseInt(number);
  },
});

