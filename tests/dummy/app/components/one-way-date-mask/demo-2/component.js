import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Demo2Component extends Component {
  @tracked foo;

  @action
  update(unmasked, masked) {
    this.foo = masked;
  }
}
