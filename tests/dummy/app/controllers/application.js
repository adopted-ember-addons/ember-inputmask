import Controller from '@ember/controller';
import { set } from '@ember/object';

export default Controller.extend({
  testValue: "test@test.test",
  numberValue: 1234567890,
  ssnValue: 123456789,

  actions: {
    updateCardType(unmasked, masked, cardType) {
      set(this, 'cardTypeValue', cardType);
    },
  },
});
