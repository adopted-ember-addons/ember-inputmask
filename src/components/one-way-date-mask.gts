import Component from '@glimmer/component';
import OneWayInputMask from './one-way-input-mask.gts';
import type { OneWayInputMaskSignature } from './one-way-input-mask.gts';

const DEFAULT_OPTIONS = {
  inputFormat: 'dd/mm/yyyy',
  outputFormat: 'ddmmyyyy',
};

/**
 * Date mask component
 */
export default class OneWayDateMask extends Component<OneWayInputMaskSignature> {
  get mergedOptions() {
    return Object.assign({}, DEFAULT_OPTIONS, this.args.options);
  }

  <template>
    <OneWayInputMask
      @alias="datetime"
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
