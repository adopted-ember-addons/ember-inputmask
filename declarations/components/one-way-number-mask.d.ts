import Component from '@glimmer/component';
import type { OneWayInputMaskSignature } from './one-way-input-mask';
export interface OneWayNumberMaskSignature extends OneWayInputMaskSignature {
    Args: OneWayInputMaskSignature['Args'] & {
        decimal?: boolean;
    };
}
/**
 * Number mask component
 */
export default class OneWayNumberMask extends Component<OneWayNumberMaskSignature> {
    get alias(): "decimal" | "integer";
    get mergedOptions(): {
        groupSeparator: string;
        radixPoint: string;
        groupSize: string;
        autoGroup: boolean;
    } & import("inputmask").default.Options;
}
//# sourceMappingURL=one-way-number-mask.d.ts.map