import Ember from 'ember';
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
 *   groupSize - number
 *     Sets the size of number separation (defaults to 3)
 *   group - bool
 *     Sets grouping (1,000 vs 1000) (defaults to false)
 */

export default InputMaskComponent.extend({
  mask: 'integer',

  // Default options
  decimal:   false,
  group:     false,
  separator: ',',
  radix:     '.',
  groupSize: '3',

  updateMask: function() {
    this.setProperties({
      'options.autoGroup':      this.get('group'),
      'options.groupSeparator': this.get('separator'),
      'options.radixPoint':     this.get('radix'),
      'options.groupSize':      this.get('groupSize')
    });

    if (this.get('decimal') === true) {
      this.set('mask', 'decimal');
      this.set('options.digits', 2);
    } else if (this.get('decimal')) {
      this.set('mask', 'decimal');
      this.set('options.digits', this.get('decimal'));
    }
    
    this._super();
  }.observes('mask', 'group', 'decimal', 'separator', 'radix', 'groupSize')
});