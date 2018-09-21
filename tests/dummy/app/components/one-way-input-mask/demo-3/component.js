import Component from '@ember/component';

// BEGIN-SNIPPET one-way-input-mask-demo-3.js
export default Component.extend({
  completed: false,

  actions: {
    oncomplete() {
      this.toggleProperty('completed');
    },
  },
});
// END-SNIPPET
