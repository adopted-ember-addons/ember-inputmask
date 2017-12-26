import OneWayInputMask, { DEFAULT_NON_BOUND_PROPS }  from 'ember-inputmask/components/one-way-input-mask';
import { computed, get } from '@ember/object';

/**
 * `{{one-way-zip-code-mask}}` component.
 *
 * Displays an input that masks a US ZIP code.
 *
 * Future: Add config options that allow users to set locality
 * app wide.
 *
 * @param {boolean} fullCode Allows users to optionally enter the full ZIP+4 area code.e
 */
export default OneWayInputMask.extend({
  NON_ATTRIBUTE_BOUND_PROPS: DEFAULT_NON_BOUND_PROPS.concat('fullCode'),

  /**
   * Allows users to optionally enter the full ZIP+4 area code.
   */
  fullCode: false,

  /**
   * @override
   */
  mask: computed('fullCode', function() {
    if (get(this, 'fullCode')) {
      return '99999[-9999]';
    }

    return '99999';
  }),
});
