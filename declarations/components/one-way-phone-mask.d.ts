import Component from '@glimmer/component';
import type { OneWayInputMaskSignature } from './one-way-input-mask';
export interface OneWayPhoneMaskSignature extends OneWayInputMaskSignature {
    Args: OneWayInputMaskSignature['Args'] & {
        extensions?: boolean;
    };
}
/**
 * Phone mask component
 */
export default class OneWayPhoneMask extends Component<OneWayPhoneMaskSignature> {
    get mask(): "(999) 999-9999[ x 9{1,4}]" | "(999) 999-9999";
}
//# sourceMappingURL=one-way-phone-mask.d.ts.map