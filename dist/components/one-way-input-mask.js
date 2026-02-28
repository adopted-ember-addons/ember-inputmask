import Component from '@glimmer/component';
import { schedule } from '@ember/runloop';
import { on } from '@ember/modifier';
import { modifier } from 'ember-modifier';
import Inputmask from 'inputmask';
import { areDifferent } from '../utils/compare-objects.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const DEFAULT_OPTIONS = {
  rightAlign: false
};
// Export for backwards compatibility with classic child components
const DEFAULT_NON_BOUND_PROPS = ['keyEvents', 'update', 'mask', 'alias', 'options'];
/**
 * Displays an input with the specified mask applied to it
 * using Inputmask library. Follows Data-down actions up pattern
 */
class OneWayInputMask extends Component {
  _oldMask = '';
  _oldAlias = undefined;
  _oldOptions = null;
  _didInsertElement = false;
  inputElement;
  keyEvents = {
    13: 'onenter',
    27: 'onescape'
  };
  setupInputModifier = modifier(element => {
    this.inputElement = element;
    this._setupMask();
    this._didInsertElement = true;
    return () => {
      this._destroyMask();
    };
  });
  updateMaskModifier = modifier(() => {
    this.updateMask();
  });
  get _options() {
    const options = Object.assign({}, DEFAULT_OPTIONS, this.args.options);
    if (this.args.alias) {
      options.alias = this.args.alias;
    } else {
      options.mask = this.args.mask;
    }
    return options;
  }
  get _value() {
    return this.args.value ?? '';
  }
  updateMask = () => {
    const mask = this.args.mask ?? '';
    const alias = this.args.alias;
    const oldMask = this._oldMask;
    const oldAlias = this._oldAlias;
    const didMaskChange = mask !== oldMask;
    const didAliasChange = alias !== oldAlias;
    const options = this.args.options ?? {};
    const oldOptions = this._oldOptions ?? {};
    const didOptionsChange = areDifferent(options, oldOptions);
    // We want to reapply the mask if it has changed
    if (didMaskChange || didAliasChange || didOptionsChange) {
      this._oldMask = mask;
      this._oldAlias = alias;
      this._oldOptions = this.args.options ?? null;
      this._changeMask();
    }
  };
  handleKeyUp = event => {
    const method = this.keyEvents[event.keyCode];
    if (method && this.args[method]) {
      this.args[method]?.(event.target.value);
    }
  };
  handleInput = event => {
    this._processNewValue(event.target.value);
  };
  /**
  * Send the update action with the values. Components that inherit from this may
  * need to override this if they want to pass additional data on the update
  */
  sendUpdate(unmaskedValue, value) {
    this.args.update?.(unmaskedValue, value);
  }
  /**
  * If this component's consumer modifies the passed in `value` inside their `update`
  * method we want to make sure that value is reflected in the input's display.
  */
  _syncValue() {
    if (!this.inputElement) return;
    const actualValue = this._value;
    const renderedValue = this.inputElement.value;
    if (actualValue !== renderedValue) {
      this.inputElement.inputmask?.setValue(String(actualValue));
    }
  }
  /**
  * Handle when a new value changes
  */
  _processNewValue(value) {
    if (!this.inputElement) return;
    const cursorStart = this.inputElement.selectionStart ?? 0;
    const cursorEnd = this.inputElement.selectionEnd ?? 0;
    const unmaskedValue = this._getUnmaskedValue();
    const oldUnmaskedValue = this._value;
    const options = this._options;
    // We only want to make changes if something is different so we don't cause infinite loops or
    // double renders.
    // We want to make sure that that values we compare are going to come out the same through
    // the masking algorithm, to ensure that we only call `update` if the values are actually different
    // (e.g. '1234.' will be masked as '1234' and so when `update` is called and passed back
    // into the component the decimal will be removed, we don't want this)
    if (Inputmask.format(String(oldUnmaskedValue), options) !== Inputmask.format(unmaskedValue, options)) {
      this.sendUpdate(unmaskedValue, value);
      // When the value is updated, and then sent back down the cursor moves to the end of the field.
      // We therefore need to put it back to where the user was typing so they don't get janked around
      // eslint-disable-next-line ember/no-runloop -- Required for Ember 5.8/5.12 compatibility
      schedule('afterRender', () => {
        this._syncValue();
        this.inputElement?.setSelectionRange(cursorStart, cursorEnd);
      });
    }
  }
  /**
  * Connect the 3rd party input masking library to the element
  */
  _setupMask() {
    if (!this.inputElement) return;
    const inputmask = new Inputmask(this._options);
    inputmask.mask(this.inputElement);
  }
  /**
  * Get the value of the element without the mask
  */
  _getUnmaskedValue() {
    if (!this.inputElement) return '';
    return this.inputElement.inputmask?.unmaskedvalue() ?? '';
  }
  /**
  * Destroy and reapply the mask when the mask or options change so the mask and
  * options can be dynamic
  */
  _changeMask() {
    if (this._didInsertElement && this.inputElement && this.inputElement.inputmask) {
      this._destroyMask();
      this._setupMask();
    }
  }
  _destroyMask() {
    this.inputElement?.inputmask?.remove();
  }
  static {
    setComponentTemplate(precompileTemplate("<input type={{@type}} value={{this._value}} {{this.setupInputModifier}} {{this.updateMaskModifier @mask @options}} {{on \"input\" this.handleInput}} {{on \"keyup\" this.handleKeyUp}} ...attributes />", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
}

export { DEFAULT_NON_BOUND_PROPS, OneWayInputMask as default };
//# sourceMappingURL=one-way-input-mask.js.map
