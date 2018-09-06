import { once } from '@ember/runloop';
import { observer } from '@ember/object';
import InputMaskComponent from 'ember-inputmask/components/input-mask';

/**
 * `{{number-input}}` component.
 *
 * Displays an input with numbers, formatted
 *
 * OPTIONS:
 *   decimal - bool or int
 *     Makes the number a decimal with the specified
 *     precision, defaults to 2 if true.
 *   radix - string
 *     Sets the radix separator (defaults to period)
 *   separator - string
 *     Sets the separator for numbers (defaults to comma)
 *   groupSize - int
 *     Sets the size of number separation (defaults to 3)
 *   group - bool
 *     Sets grouping (1,000 vs 1000) (defaults to false)
 *   digitsOptional - bool
 *     Specify whether digits are optional (defaults to true)
 *   min - number
 *     Sets a minimum value (defaults to undefined)
 *   max - number
 *     Sets a maximum value (defaults to undefined)
 *   prefix - string
 *     Sets a prefix for the number (defaults to '')
 *   suffix - string
 *     Sets a suffix for the number (defaults to '')
 *   unmaskAsNumber - bool
 *     Specify whether the input should be unmasked as a
 *     number instead of a string (defaults to false)
 */

export default InputMaskComponent.extend({
  mask: 'integer',

  // Default options
  decimal:        false,
  group:          false,
  separator:      ',',
  radix:          '.',
  groupSize:      '3',
  digitsOptional: true,
  min:            undefined,
  max:            undefined,
  prefix:         '',
  suffix:         '',
  unmaskAsNumber: false,

  oldComponent: '{{number-input}}',
  newComponent: '{{one-way-number-mask}}',

  updateMask: function() {
    this.setProperties({
      'options.autoGroup':      this.group,
      'options.groupSeparator': this.separator,
      'options.radixPoint':     this.radix,
      'options.groupSize':      this.groupSize,
      'options.digitsOptional': this.digitsOptional,
      'options.min':            this.min,
      'options.max':            this.max,
      'options.prefix':         this.prefix,
      'options.suffix':         this.suffix,
      'options.unmaskAsNumber': this.unmaskAsNumber,
    });

    if (this.decimal === true) {
      this.set('mask', 'decimal');
      this.set('options.digits', 2);
    } else if (this.decimal) {
      this.set('mask', 'decimal');
      this.set('options.digits', this.decimal);
    }

    this._super();
  },

  _maskShouldChange: observer(
    'mask',
    'group',
    'decimal',
    'separator',
    'radix',
    'groupSize',
    'digitsOptional',
    'min',
    'max',
    'prefix',
    'suffix',
    'unmaskAsNumber',
    function() {
      once(this, 'updateMask');
  })
});
