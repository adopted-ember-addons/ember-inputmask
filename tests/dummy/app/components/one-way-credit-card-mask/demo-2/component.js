import Component from '@ember/component';
import { set } from '@ember/object';

// BEGIN-SNIPPET one-way-credit-card-mask-demo-2.js
export default Component.extend({
  actions: {
    update(unmasked, masked, cardType) {
      set(this, 'unmasked', unmasked);
      set(this, 'masked', masked);
      set(this, 'cardType', cardType);
    },
  },
});
// END-SNIPPET
