import OneWayInputMask, {
  DEFAULT_NON_BOUND_PROPS,
} from 'ember-inputmask/components/one-way-input-mask';
import { computed, set } from '@ember/object';
import { isBlank } from '@ember/utils';
import { scheduleOnce } from '@ember/runloop';

/**
 * @class OneWayCreditCardMask
 */
export default OneWayInputMask.extend({
  NON_ATTRIBUTE_BOUND_PROPS: DEFAULT_NON_BOUND_PROPS.concat('separator'),

  init() {
    this._super(...arguments);

    let options = this._options;

    set(
      this,
      '_options',
      Object.assign(
        {},
        {
          // We need to make sure we catch paste events so that we change the mask before the text
          // hits the input. This is a callback provided by Inputmask.js
          onBeforePaste: (value) => {
            let cardType = this._determineCardType(value);
            // Set the card type so the parent context can access it
            set(this, '_cardType', cardType);
            this._changeMask();

            scheduleOnce('afterRender', this, 'resetMaskForPaste', value);

            return value;
          },
        },
        options,
      ),
    );
  },

  resetMaskForPaste(value) {
    // We need to reset the value in case the mask was too small before and characters were
    // cut off
    this.element.inputmask.setValue(value);

    // We need to update the parent component with the new pasted values
    this.sendUpdate(this._getUnmaskedValue(), this.element.value);
  },

  /**
   * _cardType - Use current unmasked value to determine which kind of card the user is
   * typing
   *
   * @computed _cardType
   * @private
   * @return {string} The card type
   */
  _cardType: undefined,

  /**
   * What kind of separator to use between number sections
   *
   * @argument separator
   * @type String
   */
  separator: '-',

  /**
   * Dynamically determine which mask to use based on what kind of credit card numbers the user
   * is typing
   *
   * @computed mask
   * @override
   */
  mask: computed('_cardType', 'separator', {
    get() {
      let cardType = this._cardType;
      let s = this.separator;

      if (cardType === 'American Express') {
        return `9999${s}999999${s}99999`;
      }

      if (cardType === 'Diners Club') {
        return `9999${s}999999${s}9999`;
      }

      return `9999${s}9999${s}9999${s}9999`;
    },
    set(_key, value) {
      return value;
    },
  }),

  /**
   * sendUpdate - Pass the credit card type along with the values
   *
   * @method sendUpdate
   * @override
   * @param  {string} unmaskedValue
   * @param  {string} value
   */
  sendUpdate(unmaskedValue, value) {
    let cardType = this._determineCardType(unmaskedValue);
    // Set the card type so the parent context can access it
    set(this, '_cardType', cardType);
    this.update(unmaskedValue, value, cardType);
  },

  /**
   * _determineCardType - Use current unmasked value to determine which kind of card the user is
   * typing
   *
   * @method _determineCardType
   * @private
   * @param {string} unmaskedValue
   * @return {string} The card type
   */
  _determineCardType(unmaskedValue) {
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
  },
});
