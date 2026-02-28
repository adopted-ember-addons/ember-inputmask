import Component from '@glimmer/component';
import OneWayInputMask from './one-way-input-mask.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const DEFAULT_OPTIONS = {
  groupSeparator: ',',
  radixPoint: '.',
  groupSize: '3',
  autoGroup: true
};
/**
 * Number mask component
 */
class OneWayNumberMask extends Component {
  get alias() {
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
  static {
    setComponentTemplate(precompileTemplate("<OneWayInputMask @alias={{this.alias}} @value={{@value}} @update={{@update}} @options={{this.mergedOptions}} @type={{@type}} @onenter={{@onenter}} @onescape={{@onescape}} ...attributes />", {
      strictMode: true,
      scope: () => ({
        OneWayInputMask
      })
    }), this);
  }
}

export { OneWayNumberMask as default };
//# sourceMappingURL=one-way-number-mask.js.map
