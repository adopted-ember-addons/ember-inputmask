import Component from '@glimmer/component';
import { schedule } from '@ember/runloop';
import { on } from '@ember/modifier';
import { modifier } from 'ember-modifier';
import Inputmask from 'inputmask';
import { areDifferent } from '../utils/compare-objects.ts';

const DEFAULT_OPTIONS = {
  rightAlign: false,
};

// Export for backwards compatibility with classic child components
export const DEFAULT_NON_BOUND_PROPS = [
  'keyEvents',
  'update',
  'mask',
  'options',
];

export interface OneWayInputMaskSignature {
  Element: HTMLInputElement;
  Args: {
    value?: string | number;
    mask?: Inputmask.Options['mask'];
    options?: Inputmask.Options;
    update?: (unmaskedValue: string, maskedValue: string) => void;
    onenter?: (value: string) => void;
    onescape?: (value: string) => void;
    type?: string;
  };
}

/**
 * Displays an input with the specified mask applied to it
 * using Inputmask library. Follows Data-down actions up pattern
 */
export default class OneWayInputMask extends Component<OneWayInputMaskSignature> {
  private _oldMask: Inputmask.Options['mask'] = '';
  private _oldOptions: Inputmask.Options | null = null;
  private _didInsertElement = false;

  private _changeEventListener?: (event: Event) => void;
  private inputElement?: HTMLInputElement;

  private keyEvents = {
    13: 'onenter',
    27: 'onescape',
  };

  setupInputModifier = modifier((element: HTMLInputElement) => {
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

  get _options(): Inputmask.Options {
    const options = Object.assign({}, DEFAULT_OPTIONS, this.args.options);
    options.mask = this.args.mask;
    return options;
  }

  private get _value(): string | number {
    return this.args.value ?? '';
  }

  private updateMask = (): void => {
    const mask = this.args.mask ?? '';
    const oldMask = this._oldMask;
    const didMaskChange = mask !== oldMask;
    const options = this.args.options ?? {};
    const oldOptions = this._oldOptions ?? {};
    const didOptionsChange = areDifferent(options, oldOptions);

    // We want to reapply the mask if it has changed
    if (didMaskChange || didOptionsChange) {
      this._oldMask = mask;
      this._oldOptions = this.args.options ?? null;
      this._changeMask();
    }
  };

  handleKeyUp = (event: KeyboardEvent): void => {
    const method = this.keyEvents[event.keyCode as 13 | 27];
    if (method && this.args[method as 'onenter' | 'onescape']) {
      this.args[method as 'onenter' | 'onescape']?.(
        (event.target as HTMLInputElement).value,
      );
    }
  };

  /**
   * Send the update action with the values. Components that inherit from this may
   * need to override this if they want to pass additional data on the update
   */
  protected sendUpdate(unmaskedValue: string, value: string): void {
    this.args.update?.(unmaskedValue, value);
  }

  /**
   * If this component's consumer modifies the passed in `value` inside their `update`
   * method we want to make sure that value is reflected in the input's display.
   */
  private _syncValue(): void {
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
  private _processNewValue(value: string): void {
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
    if (
      Inputmask.format(String(oldUnmaskedValue), options) !==
      Inputmask.format(unmaskedValue, options)
    ) {
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
  private _setupMask(): void {
    if (!this.inputElement) return;

    const inputmask = new Inputmask(this._options);
    inputmask.mask(this.inputElement);

    // We need to setup a manual event listener for the change event instead of using the Ember
    // Component event methods, because the Inputmask events don't play nice with the Component
    // ones. Similar issue happens in React.js as well
    // https://github.com/RobinHerbots/Inputmask/issues/1377
    const eventListener = (event: Event) =>
      this._processNewValue((event.target as HTMLInputElement).value);
    this._changeEventListener = eventListener;
    this.inputElement.addEventListener('input', eventListener);
  }

  /**
   * Get the value of the element without the mask
   */
  private _getUnmaskedValue(): string {
    if (!this.inputElement) return '';
    return this.inputElement.inputmask?.unmaskedvalue() ?? '';
  }

  /**
   * Destroy and reapply the mask when the mask or options change so the mask and
   * options can be dynamic
   */
  private _changeMask(): void {
    if (
      this._didInsertElement &&
      this.inputElement &&
      this.inputElement.inputmask
    ) {
      this._destroyMask();
      this._setupMask();
    }
  }

  private _destroyMask(): void {
    if (!this.inputElement || !this._changeEventListener) return;

    this.inputElement.removeEventListener('input', this._changeEventListener);
    this.inputElement.inputmask?.remove();
  }

  <template>
    <input
      type={{@type}}
      value={{this._value}}
      {{this.setupInputModifier}}
      {{this.updateMaskModifier @mask @options}}
      {{on "keyup" this.handleKeyUp}}
      ...attributes
    />
  </template>
}
