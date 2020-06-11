import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Demo1Component extends Component {
  @tracked foo;
}
