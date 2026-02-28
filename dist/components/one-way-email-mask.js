import OneWayInputMask from './one-way-input-mask.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class OneWayEmailMask extends OneWayInputMask {
  static {
    setComponentTemplate(precompileTemplate("<OneWayInputMask @alias=\"email\" @value={{@value}} @update={{@update}} @options={{@options}} @type={{@type}} @onenter={{@onenter}} @onescape={{@onescape}} ...attributes />", {
      strictMode: true,
      scope: () => ({
        OneWayInputMask
      })
    }), this);
  }
}

export { OneWayEmailMask as default };
//# sourceMappingURL=one-way-email-mask.js.map
