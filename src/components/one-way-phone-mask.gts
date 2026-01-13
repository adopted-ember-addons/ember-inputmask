import Component from '@glimmer/component';
import OneWayInputMask from './one-way-input-mask.gts';
import type { OneWayInputMaskSignature } from './one-way-input-mask.gts';

export interface OneWayPhoneMaskSignature extends OneWayInputMaskSignature {
  Args: OneWayInputMaskSignature['Args'] & {
    extensions?: boolean;
  };
}

/**
 * Phone mask component
 */
export default class OneWayPhoneMask extends Component<OneWayPhoneMaskSignature> {
  get mask() {
    if (this.args.extensions) {
      return '(999) 999-9999[ x 9{1,4}]';
    }
    return '(999) 999-9999';
  }

  <template>
    <OneWayInputMask
      @mask={{this.mask}}
      @value={{@value}}
      @update={{@update}}
      @options={{@options}}
      @type={{@type}}
      @onenter={{@onenter}}
      @onescape={{@onescape}}
      ...attributes
    />
  </template>
}
