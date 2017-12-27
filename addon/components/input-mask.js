import { once, debounce } from '@ember/runloop';
import { deprecate } from '@ember/debug';
import { isPresent } from '@ember/utils';
import { on } from '@ember/object/evented';
import { computed, observer, get } from '@ember/object';
import TextField from '@ember/component/text-field';
import Inputmask from 'inputmask';

/**
 * `{{input-mask}}` component.
 *
 * Displays an input with the specified mask applied to it
 * using Inputmask library.
 *
 * OPTIONS:
 *   maskPlaceholder - string
 *     Override Inputmask default's placeholder option.
 *   showMaskOnHover - bool=true
 *     Shows a preview of the mask when the field is hovered.
 *   showMaskOnFocus - bool=true
 *     Shows a preview of the mask when the field is focussed.
 *   rightAlign - bool=false
 *     Aligns the number to the right
 *   clearIncomplete - bool=false
 *     Clear the input if it was incomplete (partial date, time, etc.)
 *   greedyMask - bool=false
 *     Shows optional parts of a mask in preview when true
 *   debounce - number=0
 *     Enable by setting debounce > 0, makes sure to deduplicate calls to update the UI and only deliver the last ui change
 */

export default TextField.extend({
  mask: '',

  showMaskOnFocus: true,
  showMaskOnHover: true,
  rightAlign:      false,
  clearIncomplete: false,
  greedyMask:      false,
  debounce:        0,

  // Make this addon to initially set pattern attribute for working out of the box with
  // Ember addon like ember-cli-html5-validation
  pattern:         null,

  value: 'value',

  oldComponent: '{{input-mask}}',
  newComponent: '{{one-way-input-mask}}',

  init() {
    this._super(...arguments);
    let message = `${get(this, 'oldComponent')} is deprecated in favor of ${get(this, 'newComponent')} and will be removed in 1.0.0`;
    deprecate(message, false, {
      id: 'non-one-way-mask',
      until: '1.0.0',
    });
  },

  options: computed(function() {
    return {};
  }),

  // Initialize the mask by forcing a
  // call to the updateMask function
  didInsertElement: function() {
    this.propertyDidChange('mask');
  },

  // Remove the mask from the input
  teardownMask: on('willDestroyElement', function() {
    if (this.element.inputmask) {
      this.element.inputmask.remove();
    }
  }),

  setMask: function() {
    Inputmask.extendDefinitions({
      '2': {
        'validator': '[2-9]'
      }
    });

    if (!this.element) {
      return;
    }

    var mask = this.get('mask'), options = this.get('options');

    if (this.element.inputmask) {
      this.element.inputmask.remove();
    }

    var inputmask = new Inputmask(mask, options);
    inputmask.mask(this.element);

    // Initialize the unmasked value if it exists
    if (isPresent(this.get('unmaskedValue'))) {
      this.element.value = this.get('unmaskedValue');
    }

    // If the mask has changed, we need to refocus the input to show the
    // proper mask preview. Since the caret is not positioned by the focus
    // even, but the click event, we need to trigger a click as well.
    if (this.element === document.activeElement) {
      this.element.blur();
      this.element.focus();
      this.element.click();
    }
  },

  // Update the mask whenever the mask itself changes or one of the options changes.
  // This observer is meant to be extensible so that other fields can add options
  // (See `decimal-input`), which is why the actual setting of the mask is handled
  // in another function.
  updateMask: function() {
    if (this.get('mask').toLowerCase() === 'regex') {
      // Note: I like pattern better, but I'll leave regex in as an option
      // as well since that's what the plugin defines on the options hash
      this.set('options.regex', this.get('pattern') || this.get('regex'));
      this.set('options.mask', '');
    }

    this.setProperties({
      'options.placeholder'    : this.get('maskPlaceholder'),
      'options.showMaskOnFocus': this.get('showMaskOnFocus'),
      'options.showMaskOnHover': this.get('showMaskOnHover'),
      'options.rightAlign':      this.get('rightAlign'),
      'options.clearIncomplete': this.get('clearIncomplete'),
      'options.greedy':          this.get('greedyMask'),
    });

    this.setMask();
  },

  _maskShouldChange: observer('mask',
    'maskPlaceholder',
    'showMaskOnFocus',
    'showMaskOnHover',
    'rightAlign',
    'clearIncomplete',
    'greedyMask',
    'pattern',
    'regex',
    function() {
      once(this, 'updateMask');
  }),

  updateVar: function () {
    if (!this.element || !this.element.inputmask) {
      return;
    }
    if (this.element.inputmask.unmaskedvalue() !== this.get('unmaskedValue')) {
      this.element.value = this.get('unmaskedValue');
    }
  },

  // Unmask the value of the field and set the property.
  setUnmaskedValue: observer('value', function() {
    if (this.element && this.element.inputmask) {
      this.set('unmaskedValue', this.element.inputmask.unmaskedvalue());
    }
  }),

  // When the unmaskedValue changes, set the value.
  setValue: observer('unmaskedValue', function() {
    let debounceTime = this.get('debounce');
    if ( debounceTime ) {
      debounce(this, this.updateVar, debounce);
    } else {
      this.updateVar();
    }
  })
});
