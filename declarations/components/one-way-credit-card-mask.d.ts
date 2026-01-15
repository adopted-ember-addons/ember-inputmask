import Component from '@glimmer/component';
import type { OneWayInputMaskSignature } from './one-way-input-mask';
export interface OneWayCreditCardMaskSignature extends OneWayInputMaskSignature {
    Args: OneWayInputMaskSignature['Args'] & {
        separator?: string;
        update?: (unmaskedValue: string, maskedValue: string, cardType: string) => void;
    };
}
/**
 * Credit card mask component
 */
export default class OneWayCreditCardMask extends Component<OneWayCreditCardMaskSignature> {
    private cardType;
    private inputElement?;
    private _resetMaskForPasteValue?;
    setupInputModifier: import("ember-modifier").FunctionBasedModifier<{
        Args: {
            Positional: unknown[];
            Named: import("ember-modifier/-private/signature").EmptyObject;
        };
        Element: HTMLInputElement;
    }>;
    get separator(): string;
    get mask(): string;
    get mergedOptions(): {
        onBeforePaste: (value: string) => string;
    } & import("inputmask").default.Options;
    private handleBeforePaste;
    private _resetMaskForPasteCallback;
    resetMaskForPaste: (value: string) => void;
    sendUpdate: (unmaskedValue: string, value: string) => void;
    private determineCardType;
}
//# sourceMappingURL=one-way-credit-card-mask.d.ts.map