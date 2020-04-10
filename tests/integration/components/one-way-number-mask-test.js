import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | one way number mask', function(hooks) {
  setupRenderingTest(hooks);

  test('It defaults to an integer mask', async function(assert) {
    this.set('value', 1234.46)
    await render(hbs`{{one-way-number-mask value}}`);

    assert.dom('input').hasValue('1,234');
  });

  test('It can be a decimal mask with 2 digits with one argument', async function(assert) {
    this.set('value', 1234.567)
    await render(hbs`{{one-way-number-mask value decimal=true}}`);

    assert.dom('input').hasValue('1,234.57');
    assert.dom('input').doesNotHaveAttribute('decimal', 'decimal is not a bound attribute');
  });

  test('Can change default digits with options', async function(assert) {
    this.set('value', 1234.567)
    await render(hbs`{{one-way-number-mask value decimal=true options=(hash digits=3)}}`);

    assert.dom('input').hasValue('1,234.567');
  });

  test('Can change default digits with options', async function(assert) {
    this.set('value', 1234.567)
    await render(hbs`{{one-way-number-mask value decimal=true options=(hash digits=3)}}`);

    assert.dom('input').hasValue('1,234.567');
  });

  test('The parent can receive the updated value via the `update` action', async function(assert) {
    this.set('value', 123)
    await render(hbs`{{one-way-number-mask value update=(action (mut value))}}`);
    await fillIn('input', 456);
    assert.equal(this.value, '456');
  });

  test('It disallows decimal via the `update` action', async function(assert) {
    this.set('value', 123)
    await render(hbs`{{one-way-number-mask value
      update=(action (mut value))}}`);
    await fillIn('input', '.');
    assert.equal(this.value, '');
    assert.dom('input').hasValue('');
  });

  test('Internal options are not clobbered by external ones', async function(assert) {
    this.set('value', 123)
    await render(hbs`{{one-way-number-mask value
      update=(action (mut value))
      options=(hash prefix="$")
      decimal=true}}`);
    await fillIn('input', 1);
    await fillIn('input', 456.78901);
    assert.dom('input').hasValue('$456.79');
  });

  test('It can show a trailing decimal', async function(assert) {
    let callCount = 0;
    this.set('update', () => callCount++);
    this.set('value', '1234');
    await render(hbs`{{one-way-number-mask value
      update=update
      options=(hash prefix="$")
      decimal=true}}`);
    await fillIn('input', '1234.');
    assert.equal(callCount, 0, '');
  });
});
