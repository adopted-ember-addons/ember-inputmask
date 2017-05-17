import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find, triggerEvent } from 'ember-native-dom-helpers';

moduleForComponent('ssn-input', 'Integration | Component | ssn-input', {
  integration: true
});

test('filled-in value', function(assert) {
  this.render(hbs`{{ssn-input unmaskedValue=unmaskedValue}}`);
  fillIn('input', '123456789');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '123-45-6789');
  assert.equal(this.unmaskedValue, 123456789);
});
