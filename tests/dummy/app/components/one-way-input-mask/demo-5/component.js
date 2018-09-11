import Component from '@ember/component';
import { set } from '@ember/object';

// BEGIN-SNIPPET one-way-input-mask-demo-5.js
export default Component.extend({
  value: 'ff-44-r2',

  actions: {
    onupdate(unmasked, masked) {
      set(this, 'value', unmasked);
      set(this, 'masked', masked);
    },
  },
});
// END-SNIPPET
