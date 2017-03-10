import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find, triggerEvent } from 'ember-native-dom-helpers/test-support/helpers';

moduleForComponent('input-mask', 'Integration | Component | input-mask', {
  integration: true
});

test('regex with invalid value', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='regex'
    pattern='you_can_only_type_thi[s]+'}}`);
  fillIn('input', 'test');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '');
  assert.equal(this.unmaskedValue, '');
});

test('regex with valid value', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='regex'
    pattern='you_can_only_type_thi[s]+'}}`);
  fillIn('input', 'you_can_only_type_this');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, 'you_can_only_type_this');
  assert.equal(this.unmaskedValue, 'you_can_only_type_this');
});

test('regex with another valid value', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='regex'
    pattern='you_can_only_type_thi[s]+'}}`);
  fillIn('input', 'you_can_only_type_thisssss');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, 'you_can_only_type_thisssss');
  assert.equal(this.unmaskedValue, 'you_can_only_type_thisssss');
});

test('showMaskOnHover=true (default) works', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9-9+9'}}`);
  triggerEvent('input', 'mouseenter');
  assert.equal(find('input').value, '_-_+_');
  triggerEvent('input', 'mouseleave');
  assert.equal(find('input').value, '');
});

test('showMaskOnHover=false works', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9-9+9'
    showMaskOnHover=false}}`);
  triggerEvent('input', 'mouseenter');
  assert.equal(find('input').value, '');
});

test('showMaskOnFocus=true (default) works', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9-9+9'}}`);
  triggerEvent('input', 'focus');
  assert.equal(find('input').value, '_-_+_');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '');
});

test('showMaskOnFocus=false works', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9-9+9'
    showMaskOnFocus=false}}`);
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

test('greedyMask=false (default) works', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9[99]'}}`);
  triggerEvent('input', 'mouseenter');
  assert.equal(find('input').value, '_');
  fillIn('input', '66');
  triggerEvent('input', 'blur');
  triggerEvent('input', 'mouseenter');
  assert.equal(find('input').value, '66_');
});

test('greedyMask=true works', function(assert) {
  this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9[99]'
    greedyMask=true}}`);
  triggerEvent('input', 'mouseenter');
  assert.equal(find('input').value, '___');
});
