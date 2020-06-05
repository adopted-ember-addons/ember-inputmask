import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// BEGIN-SNIPPET one-way-credit-card-mask-demo-1.js
export default class Demo1Component extends Component {
  @tracked unmasked;
  @tracked masked;
  @tracked cardType;

  @action
  update(unmasked, masked, cardType) {
    this.unmasked = unmasked;
    this.masked = masked;
    this.cardType = cardType;
  }
}
// END-SNIPPET
