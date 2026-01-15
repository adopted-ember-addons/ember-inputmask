import Component from '@glimmer/component';
import Inputmask from 'inputmask';
export declare const DEFAULT_NON_BOUND_PROPS: string[];
export interface OneWayInputMaskSignature {
    Element: HTMLInputElement;
    Args: {
        alias?: Inputmask.Options['alias'];
        mask?: Inputmask.Options['mask'];
        options?: Inputmask.Options;
        value?: string | number;
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
    private _oldMask;
    private _oldAlias;
    private _oldOptions;
    private _didInsertElement;
    private inputElement?;
    private keyEvents;
    setupInputModifier: import("ember-modifier").FunctionBasedModifier<{
        Args: {
            Positional: unknown[];
            Named: import("ember-modifier/-private/signature").EmptyObject;
        };
        Element: HTMLInputElement;
    }>;
    updateMaskModifier: import("ember-modifier").FunctionBasedModifier<{
        Args: {
            Positional: unknown[];
            Named: import("ember-modifier/-private/signature").EmptyObject;
        };
        Element: Element;
    }>;
    get _options(): Inputmask.Options;
    private get _value();
    private updateMask;
    handleKeyUp: (event: KeyboardEvent) => void;
    handleInput: (event: Event) => void;
    /**
     * Send the update action with the values. Components that inherit from this may
     * need to override this if they want to pass additional data on the update
     */
    protected sendUpdate(unmaskedValue: string, value: string): void;
    /**
     * If this component's consumer modifies the passed in `value` inside their `update`
     * method we want to make sure that value is reflected in the input's display.
     */
    private _syncValue;
    /**
     * Handle when a new value changes
     */
    private _processNewValue;
    /**
     * Connect the 3rd party input masking library to the element
     */
    private _setupMask;
    /**
     * Get the value of the element without the mask
     */
    private _getUnmaskedValue;
    /**
     * Destroy and reapply the mask when the mask or options change so the mask and
     * options can be dynamic
     */
    private _changeMask;
    private _destroyMask;
}
//# sourceMappingURL=one-way-input-mask.d.ts.map