import Component from '@glimmer/component';
import type { OneWayInputMaskSignature } from './one-way-input-mask';
/**
 * Date mask component
 */
export default class OneWayDateMask extends Component<OneWayInputMaskSignature> {
    get mergedOptions(): {
        inputFormat: string;
        outputFormat: string;
    } & Omit<import("inputmask").default.Options, "oncleared" | "oncomplete" | "onincomplete" | "regex"> & {
        oncleared?: (event?: InputEvent) => void;
        oncomplete?: (event?: InputEvent) => void;
        onincomplete?: (event?: InputEvent) => void;
        regex?: RegExp | string;
    };
}
//# sourceMappingURL=one-way-date-mask.d.ts.map