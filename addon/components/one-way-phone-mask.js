import OneWayInputMask, {
  DEFAULT_NON_BOUND_PROPS,
} from 'ember-inputmask/components/one-way-input-mask';
import { computed } from '@ember/object';

/**
 * @class OneWayPhoneMask
 */
export default OneWayInputMask.extend({
  NON_ATTRIBUTE_BOUND_PROPS: DEFAULT_NON_BOUND_PROPS.concat('extensions'),

  /**
   * Whether or not to include extension in the mask
   *
   * @argument extensions
   * @type Boolean
   */
  extensions: false,

  /**
   * @computed mask
   * @override
   */
  mask: computed('extensions', {
    get() {
      if (this.extensions) {
        return '(999) 999-9999[ x 9{1,4}]';
      }

      return '(999) 999-9999';
    },
    set(_key, value) {
      return value;
    },
  }),
});
