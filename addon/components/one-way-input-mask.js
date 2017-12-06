/* global Inputmask */
import { OneWayInput } from 'ember-one-way-controls';
import { computed, get, set } from '@ember/object';
import { schedule } from '@ember/runloop';

const DEFAULT_OPTIONS = {
  rightAlign: false,
};

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
export default OneWayInput.extend({
  /**
   * Set the `_value` to be whatever the `element.value` is
   */
  attributeBindings: [
    'type',
    '_value:value'
  ],

  // In ember-one-way-controls all attributes are bound dynamically via a mixin, except for
  // the ones specified in this property. We need to include 'mask', and 'options' to the list
  NON_ATTRIBUTE_BOUND_PROPS: [
    'keyEvents',
    'classNames',
    'positionalParamValue',
    'update',
    'mask',
    'options',
  ],

  /**
   * mask - Pass in the `mask` string to set it on the element
   *
   * @public
   */
  mask: '',

  /**
   * options - Options accepted by the Inputmask library
   */
  options: null,

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
    set(this, 'options', Object.assign({}, DEFAULT_OPTIONS, options));
  },

  /**
   * update - This action will be called when the value changes and will be passed the unmasked value
   * and the masked value
   *
   * @public
   */
  update() {},

  didInsertElement() {
    this._setupMask();
  },

  willDestroyElement() {
    this._destroyMask();
    this.element.removeEventListener('input', this._changeEventListener);
  },

  /**
   * Disabling this so we don't have conflicts with manual addEventListener in case something
   * changes one day
   *
   * @override
   */
  change(){},

  /**
   * Disabling thi so we don't have conflicts with manual addEventListener in case something
   * changes one day
   *
   * @override
   */
  input(){},

  /**
   * _changeEventListener - A place to store the event listener we setup to listen to the 'input'
   * events, because the Inputmask library events don't play nice with the Ember components event
   *
   * @private
   */
  _changeEventListener() {},

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
    let options = get(this, 'options');

    // We only want to make changes if something is different so we don't cause infinite loops or
    // double renders.
    // We want to make sure that that values we compare are going to come out the same through
    // the masking algorithm, to ensure that we only call `update` if the values are actually different
    // (e.g. '1234.' will be masked as '1234' and so when `update` is called and passed back
    // into the component the decimal will be removed, we don't want this)
    if (Inputmask.format(String(oldUnmaskedValue), options) !== Inputmask.format(unmaskedValue, options)) {
      get(this, 'update')(unmaskedValue, value);

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
    let mask = get(this, 'mask'), options = get(this, 'options');
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

  _destroyMask() {
    this.element.inputmask.remove();
  },
});
