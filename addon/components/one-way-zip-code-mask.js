import { computed } from '@ember/object';
import OneWayInputMask, {
  DEFAULT_NON_BOUND_PROPS,
} from 'ember-inputmask/components/one-way-input-mask';

/**
 * @class OneWayZipCodeMask
 */
export default class OneWayZipCodeMask extends OneWayInputMask {
  NON_ATTRIBUTE_BOUND_PROPS = DEFAULT_NON_BOUND_PROPS.concat('fullCode');

  /**
   * Allows users to optionally enter the full ZIP+4 area code.
   *
   * @argument fullCode
   * @type Boolean
   */
  fullCode = false;

  /**
   * @computed mask
   * @override
   */
  @computed('fullCode')
  get mask() {
    if (this.fullCode) {
      return '99999[-9999]';
    }

    return '99999';
  }
}
