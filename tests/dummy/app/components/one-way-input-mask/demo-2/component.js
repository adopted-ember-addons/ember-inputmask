import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

// BEGIN-SNIPPET one-way-input-mask-demo-2.js
export default class OneWayInputMaskDemo2Component extends Component {
  @tracked foo;
}
// END-SNIPPET