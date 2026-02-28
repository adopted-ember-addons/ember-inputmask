import OneWayInputMask from './one-way-input-mask.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class OneWaySsnMask extends OneWayInputMask {
  static {
    setComponentTemplate(precompileTemplate("<OneWayInputMask @mask=\"999-99-9999\" @value={{@value}} @update={{@update}} @options={{@options}} @type={{@type}} @onenter={{@onenter}} @onescape={{@onescape}} ...attributes />", {
      strictMode: true,
      scope: () => ({
        OneWayInputMask
      })
    }), this);
  }
}

export { OneWaySsnMask as default };
//# sourceMappingURL=one-way-ssn-mask.js.map
