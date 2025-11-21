import { computed } from '@ember/object';
import OneWayInputMask, {
  DEFAULT_NON_BOUND_PROPS,
} from 'ember-inputmask/components/one-way-input-mask';

/**
 * @class OneWayPhoneMask
 */
export default class OneWayPhoneMask extends OneWayInputMask {
  NON_ATTRIBUTE_BOUND_PROPS = DEFAULT_NON_BOUND_PROPS.concat('extensions');

  /**
   * Whether or not to include extension in the mask
   *
   * @argument extensions
   * @type Boolean
   */
  extensions = false;

  /**
   * @computed mask
   * @override
   */
  @computed('extensions')
  get mask() {
    if (this.extensions) {
      return '(999) 999-9999[ x 9{1,4}]';
    }

    return '(999) 999-9999';
  }

  set mask(value) {
    return value;
  }
}
