import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find, triggerEvent } from 'ember-native-dom-helpers';

moduleForComponent('email-input', 'Integration | Component | email-input', {
  integration: true
});

test('filled-in value', function(assert) {
  this.render(hbs`{{email-input unmaskedValue=unmaskedValue}}`);
  fillIn('input', 'test@test.test');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, 'test@test.test');
  assert.equal(this.unmaskedValue, 'test@test.test');
});
