import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find, triggerEvent } from 'ember-native-dom-helpers/test-support/helpers';

moduleForComponent('phone-number-input', 'Integration | Component | phone-number-input', {
  integration: true
});

test('filled-in value', function(assert) {
  this.render(hbs`{{phone-number-input unmaskedValue=unmaskedValue}}`);
  fillIn('input', '12345678901234');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '(123) 456-7890');
  assert.equal(this.unmaskedValue, 1234567890);
});

test('extensions work', function(assert) {
  this.render(hbs`{{phone-number-input unmaskedValue=unmaskedValue extensions=true}}`);
  fillIn('input', '1234567890x1234');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '(123) 456-7890 x 1234');
  assert.equal(this.unmaskedValue, 12345678901234);
});
