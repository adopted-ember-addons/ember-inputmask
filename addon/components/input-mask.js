import Ember from 'ember';

/**
 * `{{input-mask}}` component.
 *
 * Displays an input with the specified mask applied to it
 * using the jquery.inputmask plugin.
 *
 * OPTIONS:
 *   maskPlaceholder - string
 *     Override $.inputmask default's placeholder option.
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

export default Ember.TextField.extend({
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

  options: Ember.computed(function() {
    return {};
  }),

  // Initialize the mask by forcing a
  // call to the updateMask function
  didInsertElement: function() {
    this.propertyDidChange('mask');
  },

  // Remove the mask from the input
  teardownMask: Ember.on('willDestroyElement', function() {
    this.$().inputmask('remove');
  }),

  setMask: function() {
    if (!this.$()) {
      return;
    }

    var mask    = this.get('mask'),
        options = this.get('options');

    this.$().inputmask('remove');
    this.$().inputmask(mask, options);

    // Initialize the unmasked value if it exists
    if(this.get('unmaskedValue')) {
      this.$().val(this.get('unmaskedValue'));
    }

    // If the mask has changed, we need to refocus the input to show the
    // proper mask preview. Since the caret is not positioned by the focus
    // even, but the click event, we need to trigger a click as well.
    if(this.$().is(':focus')) {
      this.$().blur().focus().click();
    }
  },

  // Update the mask whenever the mask itself changes or one of the options changes.
  // This observer is meant to be extensible so that other fields can add options
  // (See `decimal-input`), which is why the actual setting of the mask is handled
  // in another function.
  updateMask: function() {
    if (this.get('mask').toLowerCase() === 'regex') {
      // Regex has to capitalized for the plugin, but that's annoying
      // so let's just allow users to enter it however they want...
      this.set('mask', 'Regex');

      // Note: I like pattern better, but I'll leave regex in as an option
      // as well since that's what the plugin defines on the options hash
      this.set('options.regex', this.get('pattern') || this.get('regex'));
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

  _maskShouldChange: Ember.observer('mask',
    'maskPlaceholder',
    'showMaskOnFocus',
    'showMaskOnHover',
    'rightAlign',
    'clearIncomplete',
    'greedyMask',
    'pattern',
    'regex',
    function() {
      Ember.run.once(this, 'updateMask');
  }),

  updateVar: function () {
    if (!this.$()) {
      return;
    }

    if (this.$().inputmask('unmaskedvalue') !== this.get('unmaskedValue')) {
      this.$().val(this.get('unmaskedValue'));
    }
  },

  // Unmask the value of the field and set the property.
  setUnmaskedValue: Ember.observer('value', function() {
    this.set('unmaskedValue', this.$().inputmask('unmaskedvalue'));
  }),

  // When the unmaskedValue changes, set the value.
  setValue: Ember.observer('unmaskedValue', function() {
    var debounce = this.get('debounce');
    if ( debounce ) {
      Ember.run.debounce(this, this.updateVar, debounce);
    } else {
      this.updateVar();
    }
  })
});
