import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked testValue = 'test@test.test';
  @tracked numberValue = 1234567890;
  @tracked ssnValue = 123456789;

  @action
  updateCardType(unmasked, masked, cardType) {
    set(this, 'cardTypeValue', cardType);
  }
}
