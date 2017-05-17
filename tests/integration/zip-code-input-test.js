import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find, triggerEvent } from 'ember-native-dom-helpers';

moduleForComponent('zip-code-input', 'Integration | Component | zip-code-input', {
  integration: true
});

test('filled-in value', function(assert) {
  this.render(hbs`{{zip-code-input unmaskedValue=unmaskedValue}}`);
  fillIn('input', '12345');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '12345');
  assert.equal(this.unmaskedValue, 12345);
});

test('full code works', function(assert) {
  this.render(hbs`{{zip-code-input unmaskedValue=unmaskedValue fullCode=true}}`);
  fillIn('input', '123451234');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '12345-1234');
  assert.equal(this.unmaskedValue, 123451234);
});
