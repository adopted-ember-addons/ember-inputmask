import Component from '@glimmer/component';
import OneWayInputMask from './one-way-input-mask.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const DEFAULT_OPTIONS = {
  inputFormat: 'dd/mm/yyyy',
  outputFormat: 'ddmmyyyy'
};
/**
 * Date mask component
 */
class OneWayDateMask extends Component {
  get mergedOptions() {
    return Object.assign({}, DEFAULT_OPTIONS, this.args.options);
  }
  static {
    setComponentTemplate(precompileTemplate("<OneWayInputMask @alias=\"datetime\" @value={{@value}} @update={{@update}} @options={{this.mergedOptions}} @type={{@type}} @onenter={{@onenter}} @onescape={{@onescape}} ...attributes />", {
      strictMode: true,
      scope: () => ({
        OneWayInputMask
      })
    }), this);
  }
}

export { OneWayDateMask as default };
//# sourceMappingURL=one-way-date-mask.js.map
