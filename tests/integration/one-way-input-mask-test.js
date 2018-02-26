import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find } from 'ember-native-dom-helpers';

moduleForComponent('one-way-input-mask', 'Integration | Component | one-way-input-mask', {
  integration: true
});

test('It masks a passed in value', function(assert) {
  this.set('value', 123)
  this.render(hbs`{{one-way-input-mask value mask='9-9+9'}}`);
  assert.equal(find('input').value, '1-2+3');
});

test('The mask updates if the passed value is mutated in the parent', function(assert) {
  this.set('value', 123)
  this.render(hbs`{{one-way-input-mask value mask='9-9+9'}}`);
  assert.equal(find('input').value, '1-2+3');
  this.set('value', 456)
  assert.equal(find('input').value, '4-5+6');
});

test('The parent can receive the updated value via the `update` action', async function(assert) {
  this.set('value', 123)
  this.render(hbs`{{one-way-input-mask value mask='9-9+9' update=(action (mut value))}}`);
  await fillIn('input', 456);
  assert.equal(this.get('value'), '456');
});

test('Update action works when `value` begins as undefined', async function(assert) {
  this.render(hbs`{{one-way-input-mask value mask='9-9+9' update=(action (mut value))}}`);
  await fillIn('input', 456);
  assert.equal(this.get('value'), '456');
});

test('The parent can receive the masked value via the `update` action', async function(assert) {
  this.set('update', (unmasked, masked) => {
    this.set('masked', masked)
  })
  this.render(hbs`{{one-way-input-mask value mask='9-9+9' update=update}}`);
  await fillIn('input', 456);
  assert.equal(this.get('masked'), '4-5+6');
});

test('It can accept options', function(assert) {
  this.set('value', 1)
  this.set('options', { placeholder: '*' });
  this.render(hbs`{{one-way-input-mask value mask='9-9+9' options=options}}`);
  assert.equal(find('input').value, '1-*+*');
});

test('mask and options are not bound attributes', function(assert) {
  this.set('options', { placeholder: '*' });
  this.render(hbs`{{one-way-input-mask value mask='9-9+9' options=options}}`);
  assert.notOk(find('input').getAttribute('mask'), 'mask is not bound');
  assert.notOk(find('input').getAttribute('options'), 'options is not bound');
});

test('mask can dynamically be changed', function(assert) {
  this.set('mask', '9-9+9');
  this.set('value', 123);
  this.render(hbs`{{one-way-input-mask value mask=mask}}`);
  assert.equal(find('input').value, '1-2+3');

  this.set('mask', '9_9_9');
  assert.equal(find('input').value, '1_2_3');
});

test('options can dynamically be changed', function(assert) {
  this.set('value', 1)
  this.set('options', { placeholder: '*' });
  this.render(hbs`{{one-way-input-mask value mask='9-9+9' options=options}}`);
  assert.equal(find('input').value, '1-*+*');

  this.set('options', { placeholder: '_' });
  assert.equal(find('input').value, '1-_+_');
});

test('It can have classes', function(assert) {
  this.set('value', 123)
  this.render(hbs`{{one-way-input-mask value mask='9-9+9' class='foo'}}`);
  assert.equal(find('.foo').value, '1-2+3');
});
