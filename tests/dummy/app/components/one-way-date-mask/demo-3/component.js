import Component from '@ember/component';
import { set } from '@ember/object';

// BEGIN-SNIPPET one-way-date-mask-demo-3.js
export default Component.extend({
  tagName: '',

  actions: {
    update(unmasked, masked) {
      set(this, 'unmasked', unmasked);
      set(this, 'masked', masked);
    },
  },
});
// END-SNIPPET
