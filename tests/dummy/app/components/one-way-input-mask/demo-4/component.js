import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object'

// BEGIN-SNIPPET one-way-input-mask-demo-4.js
export default class Demo4Component extends Component {
  @tracked unmasked;
  @tracked masked;

  @action
  onupdate(unmasked, masked) {
    this.unmasked = unmasked;
    this.masked = masked;
  }
}
// END-SNIPPET
