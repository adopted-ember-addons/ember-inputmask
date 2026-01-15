import OneWayInputMask from './one-way-input-mask.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class OneWayCurrencyMask extends OneWayInputMask {
  static {
    setComponentTemplate(precompileTemplate("<OneWayInputMask @alias=\"currency\" @value={{@value}} @update={{@update}} @options={{@options}} @type={{@type}} @onenter={{@onenter}} @onescape={{@onescape}} ...attributes />", {
      strictMode: true,
      scope: () => ({
        OneWayInputMask
      })
    }), this);
  }
}

export { OneWayCurrencyMask as default };
//# sourceMappingURL=one-way-currency-mask.js.map
