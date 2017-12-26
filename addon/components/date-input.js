import InputMaskComponent from 'ember-inputmask/components/input-mask';

/**
 * `{{email-input}}` component.
 *
 * Displays an input that masks email addresses.
 */

export default InputMaskComponent.extend({
  oldComponent: '{{date-input}}',
  newComponent: '{{one-way-date-mask}}',
  mask: 'date'
});
