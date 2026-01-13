import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isBlank } from '@ember/utils';
import { scheduleOnce } from '@ember/runloop';
import { modifier } from 'ember-modifier';
import OneWayInputMask from './one-way-input-mask.gts';
import type { OneWayInputMaskSignature } from './one-way-input-mask.gts';

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
  @tracked private cardType: string = 'Other';
  private inputElement?: HTMLInputElement;

  setupInputModifier = modifier((element: HTMLInputElement) => {
    this.inputElement = element;
  });

  get separator() {
    return this.args.separator ?? '-';
  }

  get mask() {
    const s = this.separator;
    
    if (this.cardType === 'American Express') {
      return `9999${s}999999${s}99999`;
    }
    
    if (this.cardType === 'Diners Club') {
      return `9999${s}999999${s}9999`;
    }
    
    return `9999${s}9999${s}9999${s}9999`;
  }

  get mergedOptions() {
    return Object.assign({}, {
      onBeforePaste: (value: string) => {
        const cardType = this.determineCardType(value);
        this.cardType = cardType;
        
        scheduleOnce('afterRender', this, this.resetMaskForPaste, value);
        
        return value;
      },
    }, this.args.options);
  }

  @action
  resetMaskForPaste(value: string): void {
    if (!this.inputElement) return;
    
    // We need to reset the value in case the mask was too small before and characters were cut off
    (this.inputElement as any).inputmask?.setValue(value);
    
    // We need to update the parent component with the new pasted values
    const unmaskedValue = (this.inputElement as any).inputmask?.unmaskedvalue() ?? '';
    this.sendUpdate(unmaskedValue, this.inputElement.value);
  }

  @action
  sendUpdate(unmaskedValue: string, value: string): void {
    const cardType = this.determineCardType(unmaskedValue);
    this.cardType = cardType;
    this.args.update?.(unmaskedValue, value, cardType);
  }

  private determineCardType(unmaskedValue: string): string {
    if (isBlank(unmaskedValue)) {
      return 'Other';
    }

    if (unmaskedValue.match(/^4/)) {
      return 'Visa';
    }

    if (unmaskedValue.match(/^5[1-5]/)) {
      return 'MasterCard';
    }

    if (unmaskedValue.match(/^3[47]/)) {
      return 'American Express';
    }

    if (unmaskedValue.match(/^3(?:0[0-5]|[68])/)) {
      return 'Diners Club';
    }

    if (unmaskedValue.match(/^6(?:011|5)/)) {
      return 'Discover';
    }

    if (unmaskedValue.match(/^(?:2131|1800|35)/)) {
      return 'JCB';
    }

    return 'Other';
  }

  <template>
    <OneWayInputMask
      @mask={{this.mask}}
      @value={{@value}}
      @update={{this.sendUpdate}}
      @options={{this.mergedOptions}}
      @type={{@type}}
      @onenter={{@onenter}}
      @onescape={{@onescape}}
      {{this.setupInputModifier}}
      ...attributes
    />
  </template>
}
