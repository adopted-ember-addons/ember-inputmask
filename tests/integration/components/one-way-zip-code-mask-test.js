import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | one way zip code mask', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('update', unmaskedValue => {
      this.set('unmaskedValue', unmaskedValue);
    });
  });

  test('filled-in value', async function(assert) {
    await render(hbs`{{one-way-zip-code-mask value=unmaskedValue update=update}}`);
    await fillIn('input', '12345');
    assert.dom('input').hasValue('12345');
    assert.equal(this.unmaskedValue, 12345);
  });

  test('full code works', async function(assert) {
    await render(hbs`{{one-way-zip-code-mask value=unmaskedValue fullCode=true update=update}}`);
    await fillIn('input', '123451234');
    assert.dom('input').hasValue('12345-1234');
    assert.equal(this.unmaskedValue, 123451234);
  });
});
