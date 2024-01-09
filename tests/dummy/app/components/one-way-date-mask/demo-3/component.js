import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// BEGIN-SNIPPET one-way-date-mask-demo-3.js
export default class Demo3Component extends Component {
  @tracked unmasked;
  @tracked masked;

  @action
  update(unmasked, masked) {
    this.unmasked = unmasked;
    this.masked = masked;
  }
}
// END-SNIPPET
