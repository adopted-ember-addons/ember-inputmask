import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object'

// BEGIN-SNIPPET one-way-input-mask-demo-3.js
export default class Demo3Component extends Component {
  @tracked completed = false;

  @action
  oncomplete() {
    this.completed = !this.completed;
  }
}
// END-SNIPPET
