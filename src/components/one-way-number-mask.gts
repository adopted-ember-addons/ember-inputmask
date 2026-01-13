import Component from '@glimmer/component';
import OneWayInputMask from './one-way-input-mask.gts';
import type { OneWayInputMaskSignature } from './one-way-input-mask.gts';

const DEFAULT_OPTIONS = {
  groupSeparator: ',',
  radixPoint: '.',
  groupSize: '3',
  autoGroup: true,
};

export interface OneWayNumberMaskSignature extends OneWayInputMaskSignature {
  Args: OneWayInputMaskSignature['Args'] & {
    decimal?: boolean;
  };
}

/**
 * Number mask component
 */
export default class OneWayNumberMask extends Component<OneWayNumberMaskSignature> {
  get mask() {
    return this.args.decimal ? 'decimal' : 'integer';
  }

  get mergedOptions() {
    const baseOptions = Object.assign({}, DEFAULT_OPTIONS, this.args.options);
    
    // Give default digits if we don't have them already for decimal
    if (this.args.decimal && !baseOptions.digits) {
      baseOptions.digits = 2;
    }
    
    return baseOptions;
  }

  <template>
    <OneWayInputMask
      @mask={{this.mask}}
      @value={{@value}}
      @update={{@update}}
      @options={{this.mergedOptions}}
      @type={{@type}}
      @onenter={{@onenter}}
      @onescape={{@onescape}}
      ...attributes
    />
  </template>
}
