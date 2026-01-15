import Component from '@glimmer/component';
import type { OneWayInputMaskSignature } from './one-way-input-mask';
/**
 * Date mask component
 */
export default class OneWayDateMask extends Component<OneWayInputMaskSignature> {
    get mergedOptions(): {
        inputFormat: string;
        outputFormat: string;
    } & import("inputmask").default.Options;
}
//# sourceMappingURL=one-way-date-mask.d.ts.map