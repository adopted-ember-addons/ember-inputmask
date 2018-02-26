import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { schedule } from '@ember/runloop';
import { areDifferent } from 'ember-inputmask/utils/compare-objects';
import Inputmask from 'inputmask';

const DEFAULT_OPTIONS = {
  rightAlign: false,
};

export const DEFAULT_NON_BOUND_PROPS = [
  'keyEvents',
  'class',
  'classNames',
  'positionalParamValue',
  'update',
  'mask',
  'options',
];

/**
 * Displays an input with the specified mask applied to it
 * using Inputmask library. Follows Data-down actions up pattern
 *
 * @param {string} value The unmasked value to display in the input
 * @param {action} update The function to perform when the value changes. Will be passed the
 * unmasked value and the masked values
 * @param {string} mask The mask to use on the input
 * @param {object} options The options to pass into the Inputmask library
 */
const OneWayInputMask = Component.extend({
  tagName: 'input',

  /**
   * Set the `_value` to be whatever the `element.value` is
   */
  attributeBindings: [
    'type',
    '_value:value'
  ],

  // This is where we blacklist all the attributes that should not be bound
  NON_ATTRIBUTE_BOUND_PROPS: DEFAULT_NON_BOUND_PROPS,

  type: 'text',

  /**
   * mask - Pass in the `mask` string to set it on the element
   *
   * @public
   */
  mask: '',
  _oldMask: '',

  /**
   * options - Options accepted by the Inputmask library
   */
  options: null,
  _options: null, // Internal options so external attribute doesnt clobber it
  _oldOptions: null,

  keyEvents: {
    '13': 'onenter',
    '27': 'onescape',
  },

  /**
   * Setup _value to be a positional param or the passed param if that is not defined
   *
   * @private
   */
  _value: computed('positionalParamValue', 'value', {
    get() {
      let value = get(this, 'positionalParamValue');
      if (value === undefined) {
        value = get(this, 'value');
      }

      return value;
    }
  }),

  init() {
    this._super(...arguments);

    // Give the mask some default options that can be overridden
    let options = get(this, 'options');
    set(this, '_options', Object.assign({}, DEFAULT_OPTIONS, options));

    // We want any attribute that is not explicitally blacklisted to be bound that way we don't
    // have to whitelist every single html attribute that an `input` can have. Borrowed from
    // https://github.com/DockYard/ember-one-way-controls/blob/master/addon/-private/dynamic-attribute-bindings.js
    let newAttributeBindings = [];
    for (let key in this.attrs) {
      if (get(this, 'NON_ATTRIBUTE_BOUND_PROPS').indexOf(key) === -1 && get(this, 'attributeBindings').indexOf(key) === -1) {
        newAttributeBindings.push(key);
      }
    }

    set(this, 'attributeBindings', this.attributeBindings.concat(newAttributeBindings));
  },

  didInsertElement() {
    this._setupMask();
  },

  didReceiveAttrs() {
    let mask = get(this, 'mask');
    let oldMask = get(this, '_oldMask');
    let didMaskChange = mask !== oldMask;
    let options = get(this, 'options');
    let oldOptions = get(this, '_oldOptions');
    let didOptionsChange = areDifferent(options, oldOptions);

    if (didOptionsChange) {
      // Override external options on top of internal options
      set(this, '_options', Object.assign({}, get(this, '_options'), options));
    }

    // We want to reapply the mask if it has changed
    if (didMaskChange || didOptionsChange) {
      set(this, '_oldMask', mask);
      set(this, '_oldOptions', options);
      this._changeMask();
    }
  },

  willDestroyElement() {
    this._destroyMask();
  },

  /**
   * update - This action will be called when the value changes and will be passed the unmasked value
   * and the masked value
   *
   * @public
   */
  update() {},

  /**
   * _changeEventListener - A place to store the event listener we setup to listen to the 'input'
   * events, because the Inputmask library events don't play nice with the Ember components event
   *
   * @private
   */
  _changeEventListener() {},

  /**
   * keyUp - If the keycode matches one of the keycodes in the `keyEvents` hash we want to fire
   * the passed in action that matches it
   */
  keyUp(event) {
    let method = get(this, `keyEvents.${event.keyCode}`);
    if (method) {
      get(this, method)(event.target.value);
    }
  },

  /**
   * sendUpdate - Send the update action with the values. Components that inherit from this may
   * need to override this if they want to pass additional data on the update
   */
  sendUpdate(unmaskedValue, value) {
    get(this, 'update')(unmaskedValue, value);
  },

  /**
   * _processNewValue - Handle when a new value changes
   *
   * @private
   * @param {string} value - The masked value visible in the element
   */
  _processNewValue(value) {
    let cursorStart = this.element.selectionStart;
    let cursorEnd = this.element.selectionEnd;
    let unmaskedValue = this._getUnmaskedValue();
    let oldUnmaskedValue = get(this, '_value');
    let options = get(this, '_options');

    // We only want to make changes if something is different so we don't cause infinite loops or
    // double renders.
    // We want to make sure that that values we compare are going to come out the same through
    // the masking algorithm, to ensure that we only call `update` if the values are actually different
    // (e.g. '1234.' will be masked as '1234' and so when `update` is called and passed back
    // into the component the decimal will be removed, we don't want this)
    if (Inputmask.format(String(oldUnmaskedValue), options) !== Inputmask.format(unmaskedValue, options)) {
      this.sendUpdate(unmaskedValue, value);

      // When the value is updated, and then sent back down the cursor moves to the end of the field.
      // We therefore need to put it back to where the user was typing so they don't get janked around
      schedule('afterRender', () => {
        this.element.setSelectionRange(cursorStart, cursorEnd);
      });
    }
  },

  /**
   * _setupMask - Connect the 3rd party input masking library to the element
   *
   * @private
   */
  _setupMask() {
    let mask = get(this, 'mask'), options = get(this, '_options');
    let inputmask = new Inputmask(mask, options);
    inputmask.mask(this.element);

    // We need to setup a manual event listener for the change event instead of using the Ember
    // Component event methods, because the Inputmask events don't play nice with the Component
    // ones. Similar issue happens in React.js as well
    // https://github.com/RobinHerbots/Inputmask/issues/1377
    let eventListener = event => this._processNewValue(event.target.value);
    set(this, '_changeEventListener', eventListener);
    this.element.addEventListener('input', eventListener);
  },

  /**
   * _getUnmaskedValue - Get the value of the element without the mask
   *
   * @private
   * @return {string}  The unmasked value
   */
  _getUnmaskedValue() {
    return this.element.inputmask.unmaskedvalue();
  },

  /**
   * _changeMask - Destroy and reapply the mask when the mask or options change so the mask and
   * options can be dynamic
   *
   * @private
   */
  _changeMask() {
    if (this.element && this.element.inputmask) {
      this._destroyMask();
      this._setupMask();
    }
  },

  _destroyMask() {
    this.element.removeEventListener('input', this._changeEventListener);
    this.element.inputmask.remove();
  },
});

OneWayInputMask.reopenClass({
  positionalParams: ['positionalParamValue']
});

export default OneWayInputMask;
