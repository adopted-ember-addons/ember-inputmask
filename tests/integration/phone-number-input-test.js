import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find, triggerEvent } from 'ember-native-dom-helpers';

moduleForComponent('phone-number-input', 'Integration | Component | phone-number-input', {
  integration: true
});

test('filled-in value', function(assert) {
  this.render(hbs`{{phone-number-input unmaskedValue=unmaskedValue}}`);
  fillIn('input', '12345678901234');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '(234) 567-8901');
  assert.equal(this.unmaskedValue, 2345678901);
});

test('extensions work', function(assert) {
  this.render(hbs`{{phone-number-input unmaskedValue=unmaskedValue extensions=true}}`);
  fillIn('input', '2234567890x1234');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '(223) 456-7890 x 1234');
  assert.equal(this.unmaskedValue, 22345678901234);
});
