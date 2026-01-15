import Component from '@glimmer/component';
import type { OneWayInputMaskSignature } from './one-way-input-mask';
export interface OneWayZipCodeMaskSignature extends OneWayInputMaskSignature {
    Args: OneWayInputMaskSignature['Args'] & {
        fullCode?: boolean;
    };
}
/**
 * ZIP code mask component
 */
export default class OneWayZipCodeMask extends Component<OneWayZipCodeMaskSignature> {
    get mask(): "99999[-9999]" | "99999";
}
//# sourceMappingURL=one-way-zip-code-mask.d.ts.map