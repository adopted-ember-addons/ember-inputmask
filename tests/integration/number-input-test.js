import { moduleForComponent, test, skip } from 'ember-qunit';
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

test('prefix and suffix work', function(assert) {
  this.render(hbs`{{number-input unmaskedValue=unmaskedValue decimal=true
    group=true separator=' ' radix=',' prefix='$' suffix='%'}}`);
  fillIn('input', '12345,67');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '$12 345,67%');
  assert.equal(this.unmaskedValue, '12345,67');
});

test('prefix and suffix work', function(assert) {
  this.render(hbs`{{number-input unmaskedValue=unmaskedValue decimal=true
    group=true separator=' ' radix=',' prefix='$' suffix='%'}}`);
  fillIn('input', '12345,67');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '$12 345,67%');
  assert.equal(this.unmaskedValue, '12345,67');
});

test('min and max work', function(assert) {
  this.render(hbs`{{number-input unmaskedValue=unmaskedValue decimal=true min=43.1 max=97.5}}`);
  fillIn('input', '43');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '43.1', 'value is incorrect');
  //assert.equal(this.unmaskedValue, '43.1', 'unmasked value is incorrect'); // does not unmask correct in PhantomJS, but will work in browser

  fillIn('input', '66');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '66');
  assert.equal(this.unmaskedValue, '66');

  fillIn('input', '123.3');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '97.5');
  //assert.equal(this.unmaskedValue, '97.5', 'unmasked value is incorrect'); // does not unmask correct in PhantomJS, but will work in browser
});

test('unmask as number works', function(assert) {
  this.render(hbs`{{number-input unmaskedValue=unmaskedValue decimal=4 radix=',' unmaskAsNumber=true}}`);
  fillIn('input', '12345,6789');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '12345,6789');
  assert.equal(this.unmaskedValue, 12345.6789);
});

// The inputmask libary does some interesting things with Object.getOwnPropertyDescriptor and some
// interesting DOM voodoo that makes it so the mask appears in the field, but isn't available
// on the `.value` property.
skip('extra options work', function(assert) {
  this.render(hbs`{{number-input unmaskedValue=unmaskedValue decimal=5
    group=true groupSize=4 radix=',' separator='.' digitsOptional=false}}`);
  fillIn('input', '12345,6789');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '1.2345,67890');
  assert.equal(this.unmaskedValue, '12345,6789', 'unmasked value is incorrect'); // in a browser, this will unmask as '12345,67890', but the trailing zero does not work in PhantomJS
});

test('0 values will appear', function(assert) {
  this.set('unmaskedValue', 0);
  this.render(hbs`{{number-input unmaskedValue=unmaskedValue}}`);
  assert.equal(find('input').value, '0');
  assert.equal(this.unmaskedValue, '0', 'unmasked value is correct');
});
