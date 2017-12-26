import OneWayInputMask, { DEFAULT_NON_BOUND_PROPS } from 'ember-inputmask/components/one-way-input-mask';
import { computed, get } from '@ember/object';

/**
 * `{{one-way-phone-mask}}` component.
 *
 * Displays an input that masks a US phone number. Country code
 * not included because this is specifically US formatting.
 *
 * Future: Add config options that allow users to set locality
 * app wide.
 *
 * @param {boolean} extensions Allows optional extensions to be added to numbers
 */
export default OneWayInputMask.extend({
  NON_ATTRIBUTE_BOUND_PROPS: DEFAULT_NON_BOUND_PROPS.concat('extensions'),

  /**
   * Whether or not to include extension in the mask
   */
  extensions: false,

  /**
   * @override
   */
  mask: computed('extensions', function() {
    if (get(this, 'extensions')) {
      return '(999) 999-9999[ x 9{1,4}]';
    }

    return '(999) 999-9999';
  }),
});
