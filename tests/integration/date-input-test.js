import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find, triggerEvent } from 'ember-native-dom-helpers';

moduleForComponent('date-input', 'Integration | Component | date-input', {
  integration: true
});

test('filled-in value', function(assert) {
  this.render(hbs`{{date-input unmaskedValue=unmaskedValue}}`);
  fillIn('input', '14914');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '14/09/2014');
  assert.equal(this.unmaskedValue, '14092014');
});
