import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find, triggerEvent } from 'ember-native-dom-helpers';

moduleForComponent('credit-card-input', 'Integration | Component | credit-card-input', {
  integration: true
});

test('Visa formatting', function(assert) {
  this.render(hbs`{{credit-card-input unmaskedValue=unmaskedValue}}`);
  fillIn('input', '4444444444444444');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '4444-4444-4444-4444');
  assert.equal(this.unmaskedValue, '4444444444444444');
});

test('MasterCard formatting', function(assert) {
  this.render(hbs`{{credit-card-input unmaskedValue=unmaskedValue}}`);
  fillIn('input', '5444444444444444');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '5444-4444-4444-4444');
  assert.equal(this.unmaskedValue, '5444444444444444');
});

test('Discover formatting', function(assert) {
  this.render(hbs`{{credit-card-input unmaskedValue=unmaskedValue}}`);
  fillIn('input', '6011444444444444');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '6011-4444-4444-4444');
  assert.equal(this.unmaskedValue, '6011444444444444');
});

test('JCB formatting', function(assert) {
  this.render(hbs`{{credit-card-input unmaskedValue=unmaskedValue}}`);
  fillIn('input', '2131444444444444');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '2131-4444-4444-4444');
  assert.equal(this.unmaskedValue, '2131444444444444');
});

test('Other formatting', function(assert) {
  this.render(hbs`{{credit-card-input unmaskedValue=unmaskedValue}}`);
  fillIn('input', '9444444444444444');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '9444-4444-4444-4444');
  assert.equal(this.unmaskedValue, '9444444444444444');
});

test('American Express formatting', function(assert) {
  this.render(hbs`{{credit-card-input unmaskedValue=unmaskedValue}}`);
  fillIn('input', '344444444444444');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '3444-444444-44444');
  assert.equal(this.unmaskedValue, '344444444444444');
});

test('Diners Club formatting', function(assert) {
  this.render(hbs`{{credit-card-input unmaskedValue=unmaskedValue}}`);
  fillIn('input', '30544444444444');
  triggerEvent('input', 'blur');
  assert.equal(find('input').value, '3054-444444-4444');
  assert.equal(this.unmaskedValue, '30544444444444');
});
