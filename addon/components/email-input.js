import InputMaskComponent from 'ember-inputmask/components/input-mask';

/**
 * `{{email-input}}` component.
 *
 * Displays an input that masks email addresses.
 */

export default InputMaskComponent.extend({
  oldComponent: '{{email-input}}',
  newComponent: '{{one-way-email-mask}}',
  mask: 'email'
});
