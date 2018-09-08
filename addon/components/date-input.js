import InputMaskComponent from 'ember-inputmask/components/input-mask';
import { computed } from '@ember/object';

/**
 * `{{date-input}}` component.
 *
 * Displays an input that masks dates.
 *
 * @class DateInput
 */
export default InputMaskComponent.extend({
  oldComponent: '{{date-input}}',
  newComponent: '{{one-way-date-mask}}',
  mask: 'datetime',

  options: computed(function() {
    return {
      inputFormat: 'dd/mm/yyyy',
      outputFormat: 'ddmmyyyy',
    };
  }),
});
