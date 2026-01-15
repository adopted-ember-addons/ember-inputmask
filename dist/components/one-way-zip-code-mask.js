import Component from '@glimmer/component';
import OneWayInputMask from './one-way-input-mask.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

/**
 * ZIP code mask component
 */
class OneWayZipCodeMask extends Component {
  get mask() {
    if (this.args.fullCode) {
      return '99999[-9999]';
    }
    return '99999';
  }
  static {
    setComponentTemplate(precompileTemplate("<OneWayInputMask @mask={{this.mask}} @value={{@value}} @update={{@update}} @options={{@options}} @type={{@type}} @onenter={{@onenter}} @onescape={{@onescape}} ...attributes />", {
      strictMode: true,
      scope: () => ({
        OneWayInputMask
      })
    }), this);
  }
}

export { OneWayZipCodeMask as default };
//# sourceMappingURL=one-way-zip-code-mask.js.map
