import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object'

// BEGIN-SNIPPET one-way-input-mask-demo-5.js
export default class Demo4Component extends Component {
  @tracked value = 'ff-44-r2';
  @tracked masked;

  @action
  onupdate(unmasked, masked) {
    this.value = unmasked;
    this.masked = masked;
  }
}
// END-SNIPPET
