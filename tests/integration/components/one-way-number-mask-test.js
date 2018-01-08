import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, fillIn } from 'ember-native-dom-helpers';

moduleForComponent('one-way-number-mask', 'Integration | Component | one way number mask', {
  integration: true
});

test('It defaults to an integer mask', function(assert) {
  this.set('value', 1234.56)
  this.render(hbs`{{one-way-number-mask value}}`);

  assert.equal(find('input').value, '1,234');
});

test('It can be a decimal mask with 2 digits with one argument', function(assert) {
  this.set('value', 1234.567)
  this.render(hbs`{{one-way-number-mask value decimal=true}}`);

  assert.equal(find('input').value, '1,234.57');
  assert.notOk(find('input').getAttribute('decimal'), 'decimal is not a bound attribute');
});

test('Can change default digits with options', function(assert) {
  this.set('value', 1234.567)
  this.render(hbs`{{one-way-number-mask value decimal=true options=(hash digits=3)}}`);

  assert.equal(find('input').value, '1,234.567');
});

test('Can change default digits with options', function(assert) {
  this.set('value', 1234.567)
  this.render(hbs`{{one-way-number-mask value decimal=true options=(hash digits=3)}}`);

  assert.equal(find('input').value, '1,234.567');
});

test('The parent can receive the updated value via the `update` action', async function(assert) {
  this.set('value', 123)
  this.render(hbs`{{one-way-number-mask value update=(action (mut value))}}`);
  await fillIn('input', 456);
  assert.equal(this.get('value'), '456');
});

test('Internal options are not clobbered by external ones', async function(assert) {
  this.set('value', 123)
  this.render(hbs`{{one-way-number-mask value
    update=(action (mut value))
    options=(hash prefix="$")
    decimal=true}}`);
  await fillIn('input', 1);
  await fillIn('input', 456.78901);
  assert.equal(find('input').value, '$456.79');
});
