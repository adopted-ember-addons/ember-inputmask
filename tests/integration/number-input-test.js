import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, triggerEvent, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | number-input', function(hooks) {
  setupRenderingTest(hooks);

  test('invalid value', async function(assert) {
    await render(hbs`{{number-input unmaskedValue=unmaskedValue}}`);
    await fillIn('input', 'test');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('');
    assert.equal(this.unmaskedValue, '');
  });

  test('valid value', async function(assert) {
    await render(hbs`{{number-input unmaskedValue=unmaskedValue}}`);
    await fillIn('input', '123456789');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('123456789');
    assert.equal(this.unmaskedValue, 123456789);
  });

  test('value with decimal mark', async function(assert) {
    await render(hbs`{{number-input unmaskedValue=unmaskedValue decimal=true}}`);
    await fillIn('input', '1234567.89');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('1234567.89');
    assert.equal(this.unmaskedValue, 1234567.89);
  });

  test('prefix and suffix work', async function(assert) {
    await render(hbs`{{number-input unmaskedValue=unmaskedValue decimal=true
      group=true separator=' ' radix=',' prefix='$' suffix='%'}}`);
    await fillIn('input', '12345,67');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('$12 345,67%');
    assert.equal(this.unmaskedValue, '12345,67');
  });

  test('prefix and suffix work', async function(assert) {
    await render(hbs`{{number-input unmaskedValue=unmaskedValue decimal=true
      group=true separator=' ' radix=',' prefix='$' suffix='%'}}`);
    await fillIn('input', '12345,67');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('$12 345,67%');
    assert.equal(this.unmaskedValue, '12345,67');
  });

  test('min and max work', async function(assert) {
    await render(hbs`{{number-input unmaskedValue=unmaskedValue decimal=true min=43.1 max=97.5}}`);
    await fillIn('input', '43');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('43.1', 'value is incorrect');
    //assert.equal(this.unmaskedValue, '43.1', 'unmasked value is incorrect'); // does not unmask correct in PhantomJS, but will work in browser

    await fillIn('input', '66');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('66');
    assert.equal(this.unmaskedValue, '66');

    await fillIn('input', '123.3');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('97.5');
    //assert.equal(this.unmaskedValue, '97.5', 'unmasked value is incorrect'); // does not unmask correct in PhantomJS, but will work in browser
  });

  test('unmask as number works', async function(assert) {
    await render(hbs`{{number-input unmaskedValue=unmaskedValue decimal=4 radix=',' unmaskAsNumber=true}}`);
    await fillIn('input', '12345,6789');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('12345,6789');
    assert.equal(this.unmaskedValue, 12345.6789);
  });

  // The inputmask libary does some interesting things with Object.getOwnPropertyDescriptor and some
  // interesting DOM voodoo that makes it so the mask appears in the field, but isn't available
  // on the `.value` property.
  skip('extra options work', async function(assert) {
    this.render(hbs`{{number-input unmaskedValue=unmaskedValue decimal=5
      group=true groupSize=4 radix=',' separator='.' digitsOptional=false}}`);
    await fillIn('input', '12345,6789');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('1.2345,67890');
    assert.equal(this.unmaskedValue, '12345,6789', 'unmasked value is incorrect'); // in a browser, this will unmask as '12345,67890', but the trailing zero does not work in PhantomJS
  });

  test('0 values will appear', async function(assert) {
    this.set('unmaskedValue', 0);
    await render(hbs`{{number-input unmaskedValue=unmaskedValue}}`);
    assert.dom('input').hasValue('0');
    assert.equal(this.unmaskedValue, '0', 'unmasked value is correct');
  });
});
