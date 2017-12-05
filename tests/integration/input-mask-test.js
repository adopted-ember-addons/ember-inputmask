import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find, triggerEvent } from 'ember-native-dom-helpers';

moduleForComponent('input-mask', 'Integration | Component | input-mask', {
  integration: true
});

test('regex with invalid value', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='regex'
    pattern='[a-z]+ is [0-9]*'}}`);
  fillIn('input', '42');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '');
  assert.equal(this.unmaskedValue, '');
});

test('regex with valid value', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='regex'
    pattern='[a-z]+ is [0-9]*'}}`);
  fillIn('input', 'answer is 42');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, 'answer is 42');
  assert.equal(this.unmaskedValue, 'answer42');
});

test('regex with another valid value', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='regex'
    pattern='[a-z]+ is [0-9]*'}}`);
  fillIn('input', 'question is ?');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, 'question is ');
  assert.equal(this.unmaskedValue, 'question');
});

// The inputmask libary does some interesting things with Object.getOwnPropertyDescriptor and some
// interesting DOM voodoo that makes it so the mask appears in the field, but isn't available
// on the `.value` property.
skip('showMaskOnHover=true (default) works', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9-9+9'}}`);
  triggerEvent('input', 'mouseenter');
  assert.equal(find('input').value, '_-_+_');
  triggerEvent('input', 'mouseleave');
  assert.equal(find('input').value, '');
});

// The inputmask libary does some interesting things with Object.getOwnPropertyDescriptor and some
// interesting DOM voodoo that makes it so the mask appears in the field, but isn't available
// on the `.value` property.
skip('showMaskOnHover=false works', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9-9+9'
    showMaskOnHover=false}}`);
  triggerEvent('input', 'mouseenter');
  assert.equal(find('input').value, '');
});

// The inputmask libary does some interesting things with Object.getOwnPropertyDescriptor and some
// interesting DOM voodoo that makes it so the mask appears in the field, but isn't available
// on the `.value` property.
skip('showMaskOnFocus=true (default) works', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9-9+9'
    showMaskOnHover=false}}`);
  triggerEvent('input', 'focus');
  assert.equal(find('input').value, '_-_+_');
});

// The inputmask libary does some interesting things with Object.getOwnPropertyDescriptor and some
// interesting DOM voodoo that makes it so the mask appears in the field, but isn't available
// on the `.value` property.
skip('showMaskOnFocus=false works', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9-9+9'
    showMaskOnFocus=false showMaskOnHover=false}}`);
  triggerEvent('input', 'mouseenter');
  triggerEvent('input', 'focus');
  assert.equal(find('input').value, '');
});

test('clearIncomplete works', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9-9+9'
    clearIncomplete=true}}`);
  fillIn('input', '6');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '');
});

// The inputmask libary does some interesting things with Object.getOwnPropertyDescriptor and some
// interesting DOM voodoo that makes it so the mask appears in the field, but isn't available
// on the `.value` property.
skip('greedyMask=false (default) works', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9[99]'}}`);
  triggerEvent('input', 'mouseenter');
  assert.equal(find('input').value, '_');
  fillIn('input', '66');
  triggerEvent('input', 'blur');
  triggerEvent('input', 'mouseenter');
  assert.equal(find('input').value, '66_');
});

// The inputmask libary does some interesting things with Object.getOwnPropertyDescriptor and some
// interesting DOM voodoo that makes it so the mask appears in the field, but isn't available
// on the `.value` property.
skip('greedyMask=true works', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9[99]'
    greedyMask=true}}`);
  triggerEvent('input', 'mouseenter');
  assert.equal(find('input').value, '___');
});
