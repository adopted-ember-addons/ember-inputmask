import InputMaskComponent from 'ember-inputmask/components/input-mask';

/**
 * `{{date-input}}` component.
 *
 * Displays an input that masks dates.
 */

export default InputMaskComponent.extend({
  oldComponent: '{{date-input}}',
  newComponent: '{{one-way-date-mask}}',
  mask: 'date'
});
