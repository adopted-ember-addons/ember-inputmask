import { once } from '@ember/runloop';
import { observer } from '@ember/object';
import InputMaskComponent from 'ember-inputmask/components/input-mask';

/**
 * The `{{credit-card-input}}` component.
 *
 * Displays an input with that masks to credit card numbers
 *
 * Currently Supports: Visa, MasterCard, Amex, Diners Club, Discover, JCB
 *
 * FUTURE:
 *   - Add support for more cards
 *   - Add validation for full card numbers
 * 
 * @class CreditCardInput
 */
export default InputMaskComponent.extend({
  oldComponent: '{{credit-card-input}}',
  newComponent: '{{one-way-credit-card-mask}}',

  updateMask: function() {
    var cardType  = this.get('cardType'),
        s         = this.get('separator') || '-', // s for separator for convenience
        mask;                                     // Also, we put the default in here instead
                                                  // of defining it on the model

    if (cardType === 'American Express') {
      mask = '9999' + s + '999999' + s + '99999';
    } else if (cardType === 'Diners Club') {
      mask = '9999' + s + '999999' + s + '9999';
    } else {
      mask = '9999' + s + '9999' + s + '9999' + s + '9999';
    }

    if (this.get('mask') !== mask) {
      this.set('mask', mask);
    }
    this._super();
  },

  _maskShouldChange: observer('mask', 'cardType', 'separator', function() {
    once(this, 'updateMask');
  }),

  updateCardType: observer('unmaskedValue', function() {
    var unmaskedValue = this.get('unmaskedValue') || '',
        cardType;

    if (unmaskedValue.match(/^4/)) {
      cardType = 'Visa';
    } else if (unmaskedValue.match(/^5[1-5]/)) {
      cardType = 'MasterCard';
    } else if (unmaskedValue.match(/^3[47]/)) {
      cardType = 'American Express';
    } else if (unmaskedValue.match(/^3(?:0[0-5]|[68])/)) {
      cardType = 'Diners Club';
    } else if (unmaskedValue.match(/^6(?:011|5)/)) {
      cardType = 'Discover';
    } else if (unmaskedValue.match(/^(?:2131|1800|35)/)) {
      cardType = 'JCB';
    } else {
      cardType = 'Other';
    }

    this.set('cardType', cardType);
  })
});
