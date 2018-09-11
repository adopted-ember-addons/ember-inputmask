import Component from '@ember/component';
import { set } from '@ember/object';

// BEGIN-SNIPPET one-way-input-mask-demo-4.js
export default Component.extend({
  actions: {
    onupdate(unmasked, masked) {
      set(this, 'unmasked', unmasked);
      set(this, 'masked', masked);
    },
  },
});
// END-SNIPPET
