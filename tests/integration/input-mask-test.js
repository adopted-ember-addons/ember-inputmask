import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, triggerEvent, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input-mask', function(hooks) {
  setupRenderingTest(hooks);

  test('regex with invalid value', async function(assert) {
    await render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='regex'
      pattern='[a-z]+ is [0-9]*'}}`);
    await fillIn('input', '42');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('');
    assert.equal(this.unmaskedValue, '');
  });

  test('regex with valid value', async function(assert) {
    await render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='regex'
      pattern='[a-z]+ is [0-9]*'}}`);
    await fillIn('input', 'answer is 42');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('answer is 42');
    assert.equal(this.unmaskedValue, 'answer42');
  });

  test('regex with another valid value', async function(assert) {
    await render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='regex'
      pattern='[a-z]+ is [0-9]*'}}`);
    await fillIn('input', 'question is ?');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('question is ');
    assert.equal(this.unmaskedValue, 'question');
  });

  // The inputmask libary does some interesting things with Object.getOwnPropertyDescriptor and some
  // interesting DOM voodoo that makes it so the mask appears in the field, but isn't available
  // on the `.value` property.
  skip('showMaskOnHover=true (default) works', function(assert) {
    this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9-9+9'}}`);
    triggerEvent('input', 'mouseenter');
    assert.dom('input').hasValue('_-_+_');
    triggerEvent('input', 'mouseleave');
    assert.dom('input').hasValue('');
  });

  // The inputmask libary does some interesting things with Object.getOwnPropertyDescriptor and some
  // interesting DOM voodoo that makes it so the mask appears in the field, but isn't available
  // on the `.value` property.
  skip('showMaskOnHover=false works', function(assert) {
    this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9-9+9'
      showMaskOnHover=false}}`);
    triggerEvent('input', 'mouseenter');
    assert.dom('input').hasValue('');
  });

  // The inputmask libary does some interesting things with Object.getOwnPropertyDescriptor and some
  // interesting DOM voodoo that makes it so the mask appears in the field, but isn't available
  // on the `.value` property.
  skip('showMaskOnFocus=true (default) works', function(assert) {
    this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9-9+9'
      showMaskOnHover=false}}`);
    triggerEvent('input', 'focus');
    assert.dom('input').hasValue('_-_+_');
  });

  // The inputmask libary does some interesting things with Object.getOwnPropertyDescriptor and some
  // interesting DOM voodoo that makes it so the mask appears in the field, but isn't available
  // on the `.value` property.
  skip('showMaskOnFocus=false works', function(assert) {
    this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9-9+9'
      showMaskOnFocus=false showMaskOnHover=false}}`);
    triggerEvent('input', 'mouseenter');
    triggerEvent('input', 'focus');
    assert.dom('input').hasValue('');
  });

  test('clearIncomplete works', async function(assert) {
    await render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9-9+9'
      clearIncomplete=true}}`);
    fillIn('input', '6');
    triggerEvent('input', 'blur');
    assert.dom('input').hasValue('');
  });

  // The inputmask libary does some interesting things with Object.getOwnPropertyDescriptor and some
  // interesting DOM voodoo that makes it so the mask appears in the field, but isn't available
  // on the `.value` property.
  skip('greedyMask=false (default) works', function(assert) {
    this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9[99]'}}`);
    triggerEvent('input', 'mouseenter');
    assert.dom('input').hasValue('_');
    fillIn('input', '66');
    triggerEvent('input', 'blur');
    triggerEvent('input', 'mouseenter');
    assert.dom('input').hasValue('66_');
  });

  // The inputmask libary does some interesting things with Object.getOwnPropertyDescriptor and some
  // interesting DOM voodoo that makes it so the mask appears in the field, but isn't available
  // on the `.value` property.
  skip('greedyMask=true works', function(assert) {
    this.render(hbs`{{input-mask unmaskedValue=unmaskedValue mask='9[99]'
      greedyMask=true}}`);
    triggerEvent('input', 'mouseenter');
    assert.dom('input').hasValue('___');
  });
});
