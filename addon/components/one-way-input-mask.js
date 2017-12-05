/* global Inputmask */
import { OneWayInput } from 'ember-one-way-controls';
import { computed, get, set } from '@ember/object';
import { isBlank } from '@ember/utils';

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

    // Give options default value of {}, without setting it as {} in the property definition
    // otherwise it will be shared accross all instances of the component
    if (isBlank(get(this, 'options'))) {
      set(this, 'options', {});
    }
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
  },

  /**
   * @override
   */
  change(event) {
    this._processNewValue(event.target.value)
  },

  /**
   * @override
   */
  input(event) {
    this._processNewValue(event.target.value)
  },

  /**
   * _processNewValue - Handle when a new value changes
   *
   * @private
   * @param {string} value - The masked value visible in the element
   */
  _processNewValue(value) {
    // We only want to make changes if something is different so we don't cause infinite loops or
    // double renders
    if (get(this, '_value') !== value) {
      get(this, 'update')(this._getUnmaskedValue(), value);
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
