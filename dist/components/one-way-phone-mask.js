import Component from '@glimmer/component';
import OneWayInputMask from './one-way-input-mask.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

/**
 * Phone mask component
 */
class OneWayPhoneMask extends Component {
  get mask() {
    if (this.args.extensions) {
      return '(999) 999-9999[ x 9{1,4}]';
    }
    return '(999) 999-9999';
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

export { OneWayPhoneMask as default };
//# sourceMappingURL=one-way-phone-mask.js.map
