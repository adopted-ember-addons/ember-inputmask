import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find, triggerEvent } from 'ember-native-dom-helpers';

moduleForComponent('number-input', 'Integration | Component | number-input', {
  integration: true
});

test('invalid value', function(assert) {
  this.render(hbs`{{number-input unmaskedValue=unmaskedValue}}`);
  fillIn('input', 'test');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '');
  assert.equal(this.unmaskedValue, '');
});

test('valid value', function(assert) {
  this.render(hbs`{{number-input unmaskedValue=unmaskedValue}}`);
  fillIn('input', '123456789');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '123456789');
  assert.equal(this.unmaskedValue, 123456789);
});

test('value with decimal mark', function(assert) {
  this.render(hbs`{{number-input unmaskedValue=unmaskedValue decimal=true}}`);
  fillIn('input', '1234567.89');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '1234567.89');
  assert.equal(this.unmaskedValue, 1234567.89);
});

test('extra options work', function(assert) {
  this.render(hbs`{{number-input unmaskedValue=unmaskedValue decimal=4
    group=true groupSize=4 radix=',' separator='.'}}`);
  fillIn('input', '12345,6789');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '1.2345,6789');
  assert.equal(this.unmaskedValue, '12345,6789');
});
