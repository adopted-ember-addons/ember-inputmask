import Component from '@glimmer/component';
import OneWayInputMask from './one-way-input-mask.gts';
import type { OneWayInputMaskSignature } from './one-way-input-mask.gts';

export interface OneWayZipCodeMaskSignature extends OneWayInputMaskSignature {
  Args: OneWayInputMaskSignature['Args'] & {
    fullCode?: boolean;
  };
}

/**
 * ZIP code mask component
 */
export default class OneWayZipCodeMask extends Component<OneWayZipCodeMaskSignature> {
  get mask() {
    if (this.args.fullCode) {
      return '99999[-9999]';
    }
    return '99999';
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
